export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.appUrl || 'https://github.com/aliefibnu'

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`

  event.node.res.setHeader('Content-Type', 'text/plain')
  return robots
})
