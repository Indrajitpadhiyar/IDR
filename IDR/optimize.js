import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

async function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  for (const file of files) {
    if (['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) {
      const inputPath = path.join(publicDir, file);
      const tempPath = path.join(publicDir, 'temp_' + file);
      
      console.log(`Optimizing ${file}...`);
      try {
        const metadata = await sharp(inputPath).metadata();
        let pipeline = sharp(inputPath);
        
        // Resize if too large
        if (metadata.width > 1200) {
          pipeline = pipeline.resize(1200, undefined, { withoutEnlargement: true });
        }
        
        // Compress based on format
        if (file.toLowerCase().endsWith('.png')) {
          pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
        } else {
          pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        }
        
        await pipeline.toFile(tempPath);
        fs.renameSync(tempPath, inputPath);
        console.log(`Done optimizing ${file}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
}

optimizeImages();
