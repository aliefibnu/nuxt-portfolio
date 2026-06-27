import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataFilePath = path.join(__dirname, '../my-data.md')
const outputDir = path.join(__dirname, '../app/data')
const outputFilePath = path.join(outputDir, 'portfolio-data.json')

function parseData() {
  try {
    console.log('Parsing my-data.md...')
    
    if (!fs.existsSync(dataFilePath)) {
      console.error(`Error: my-data.md not found at ${dataFilePath}`)
      process.exit(1)
    }

    const fileContent = fs.readFileSync(dataFilePath, 'utf8')
    
    // Clean frontmatter markers if they exist
    let yamlContent = fileContent
    if (fileContent.trim().startsWith('---')) {
      const parts = fileContent.split('---')
      // Merge all parts after the first frontmatter block if there are multiple parts
      if (parts.length >= 3) {
        yamlContent = parts.slice(1).join('---')
      }
    }

    const parsedData = YAML.parse(yamlContent)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(parsedData, null, 2), 'utf8')
    console.log(`Successfully generated portfolio-data.json at ${outputFilePath}`)
  } catch (error) {
    console.error('Failed to parse my-data.md:', error)
    process.exit(1)
  }
}

parseData()
