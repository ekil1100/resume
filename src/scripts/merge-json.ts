import fs from 'fs'
import path from 'path'

// Function to recursively merge JSON objects and arrays
function deepMerge(target: any, source: any): any {
    if (
        typeof target === 'object' &&
        target !== null &&
        typeof source === 'object' &&
        source !== null
    ) {
        if (Array.isArray(target) && Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                target[i] = deepMerge(target[i], source[i])
            }
        } else {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = deepMerge(target[key], source[key])
                }
            }
        }
    } else {
        return source !== undefined ? source : target
    }
    return target
}

// Function to merge JSON files
function mergeJsonFiles(
    fileA: string,
    fileB: string,
    outputFile: string,
): void {
    // Read and parse JSON file A
    const jsonA: any = JSON.parse(fs.readFileSync(fileA, 'utf-8'))

    // Read and parse JSON file B
    const jsonB: any = JSON.parse(fs.readFileSync(fileB, 'utf-8'))

    // Merge JSON files
    const mergedJson = deepMerge(jsonA, jsonB)

    // Write the merged JSON to output file
    fs.writeFileSync(outputFile, JSON.stringify(mergedJson, null, 2))
}

function main(): void {
    const args = process.argv.slice(2)

    if (args.length !== 3) {
        console.error(
            'Usage: pnpm tsx ./src/scripts/merge-json.ts <fileA> <fileB> <outputFile>',
        )
        process.exit(1)
    }

    const fileA = args[0]
    const fileB = args[1]
    const outputFile = args[2]

    mergeJsonFiles(fileA, fileB, outputFile)
}

main()
