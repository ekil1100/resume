import fs from 'fs'
import path from 'path'
import cv from '~/resume.json'

const filePath = path.join(__dirname, '../../resume.json')

fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error('Error reading file:', err)
        return
    }

    cv.meta.lastModified = stats.mtime.toISOString()

    fs.writeFile(filePath, JSON.stringify(cv), (err) => {
        if (err) {
            console.error('Error writing file:', err)
            return
        }

        console.log('File written successfully')
    })
})
