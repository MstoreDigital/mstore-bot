import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export const readRecursive = async (dirPath: string, cb: (file: string) => Promise<void>, arrayOfFiles: string[] = []) => {
	const files = await readdir(dirPath)
	files.map(async (file) => {
		const fileStat = await stat(dirPath + '/' + file)
		if (fileStat.isDirectory()) {
			arrayOfFiles = await readRecursive(dirPath + '/' + file, cb, arrayOfFiles)
		} else {
			arrayOfFiles.push(join(__dirname, dirPath, '/', file))
			await cb(join(dirPath, '/', file))
		}
	})
	return arrayOfFiles
}
