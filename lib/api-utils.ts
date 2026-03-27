import fs from 'fs/promises';
import path from 'path';

export async function readJson(collectionRoot: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', collectionRoot, `${slug}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function writeJson(collectionRoot: string, slug: string, data: unknown) {
  const dirPath = path.join(process.cwd(), 'content', collectionRoot);
  const filePath = path.join(dirPath, `${slug}.json`);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function deleteJson(collectionRoot: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', collectionRoot, `${slug}.json`);
  await fs.unlink(filePath);
}
