import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.appUrl || 'https://github.com/aliefibnu'

  // Recursive image finder in the public directory
  const publicDir = path.resolve('./public')
  const images: string[] = []

  function scanImages(dir: string) {
    if (!fs.existsSync(dir)) return
    const list = fs.readdirSync(dir)
    for (const file of list) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat && stat.isDirectory()) {
        scanImages(fullPath)
      } else {
        const ext = path.extname(file).toLowerCase()
        if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.avif', '.gif'].includes(ext)) {
          const relativePath = path.relative(publicDir, fullPath).replace(/\\/g, '/')
          // Filter out favicons or other utility files
          if (!relativePath.toLowerCase().includes('favicon') && relativePath !== 'robots.txt') {
            images.push(relativePath)
          }
        }
      }
    }
  }

  scanImages(publicDir)

  // Map image XML tags according to Google Image Sitemap specification
  const imageTags = images.map(img => {
    // Format clean titles based on filenames
    const cleanTitle = img
      .split('/').pop()
      ?.split('.')[0]
      ?.replace(/[-_]/g, ' ')
      ?.replace(/\b\w/g, c => c.toUpperCase()) || 'Image'

    return `    <image:image>
      <image:loc>${siteUrl}/${img}</image:loc>
      <image:title>${cleanTitle}</image:title>
    </image:image>`
  }).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${imageTags}
  </url>
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})
