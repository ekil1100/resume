import puppeteer from 'puppeteer'
import path from 'path'

async function printPage(url: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle2' })

    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0.5in',
            bottom: '0.5in',
            left: '0.5in',
            right: '0.5in',
        },
        scale: 0.8,
    })

    await browser.close()
}

const url = 'http://localhost:5173/'
const outputPath = path.join(__dirname, '../../public/resume.pdf')

printPage(url, outputPath)
    .then(() => console.log('PDF generated successfully'))
    .catch((error) => console.error('Error generating PDF:', error))
