import fs from 'fs';

export function removeFolder(path: fs.PathLike, folderName?: string) {
  if (fs.existsSync(path)) {
    try {
      fs.rmSync(path, { recursive: true });
    } catch (error) {
      throw error;
    }
    console.log(`🗑️ ${folderName} is removed`);
  }
}
