import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/portfolio');

async function optimizeImages() {
  try {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const inputPath = path.join(directoryPath, file);
        const fileExt = path.extname(file);
        const fileName = path.basename(file, fileExt);
        const outputPath = path.join(directoryPath, `${fileName}.webp`);

        console.log(`Processing: ${file}`);
        
        // Convert to WebP, compress and resize
        await sharp(inputPath)
          .rotate() // Automatically read EXIF rotation data and apply it
          .resize({ width: 1920, withoutEnlargement: true }) // Prevent extremely large dimensions
          .webp({ quality: 80, effort: 6 }) // 80 quality is visually identical to original
          .toFile(outputPath);
          
        console.log(`Optimized and saved: ${fileName}.webp`);
      }
    }
    console.log('All images optimized successfully!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
