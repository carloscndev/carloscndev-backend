import path from "path";
import fs from "fs";
import type { Core } from "@strapi/strapi";

const ASSETS_DIR = path.join(
  process.cwd(),
  "..",
  "carloscndev-frontend",
  "src",
  "assets",
  "images"
);

export async function uploadFile(strapi: Core.Strapi, filename: string) {
  const filepath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`[Seeder] Image not found: ${filepath}`);
    return null;
  }
  const stat = fs.statSync(filepath);
  const uploadService = strapi.plugin("upload").service("upload");
  const uploaded = await uploadService.upload(
    {
      data: { fileInfo: { name: filename } },
      files: {
        filepath,
        originalFilename: filename,
        mimetype: "image/webp",
        size: stat.size,
      },
    },
    { user: null }
  );
  return Array.isArray(uploaded) ? uploaded[0] : uploaded;
}
