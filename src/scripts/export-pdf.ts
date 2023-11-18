import puppeteer from 'puppeteer'
import path from 'path'

async function printPage(url: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch({ headless: 'new' })
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

const url = (lang: string) => 'http://localhost:5173/?lang=' + lang
const outputPath = (lang: string) =>
    path.join(__dirname, `../../public/resume_${lang}.pdf`)

const generatePDF = (lang: string) =>
    printPage(url(lang), outputPath(lang))
        .then(() => console.log(`resume_${lang}.pdf generated successfully`))
        .catch((error) => console.error('Error generating PDF:', error))

// generatePDF('en')
generatePDF('zh')
