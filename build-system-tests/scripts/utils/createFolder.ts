import fs from 'fs';

export function createFolder(path: fs.PathLike, folderName?: string) {
  if (!fs.existsSync(path)) {
    try {
      fs.mkdirSync(path, { recursive: true });
    } catch (error) {
      throw error;
    }
    console.log(`📂 ${folderName ? folderName : 'A'} folder is created.`);
  }
}
