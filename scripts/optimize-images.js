import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimize() {
  console.log('--- Optimizing Project Images ---');
  const projectDir = path.resolve('public/project');
  const projectFiles = fs.readdirSync(projectDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

  for (const file of projectFiles) {
    const srcPath = path.join(projectDir, file);
    const baseName = path.parse(file).name;
    const destWebp = path.join(projectDir, `${baseName}.webp`);

    const beforeStats = fs.statSync(srcPath);
    await sharp(srcPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(destWebp);

    const afterStats = fs.statSync(destWebp);
    console.log(`[Project] ${file} (${Math.round(beforeStats.size / 1024)} KB) -> ${baseName}.webp (${Math.round(afterStats.size / 1024)} KB)`);
  }

  console.log('--- Optimizing Img Directory ---');
  const imgDir = path.resolve('public/img');
  const imgFiles = fs.readdirSync(imgDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

  for (const file of imgFiles) {
    const srcPath = path.join(imgDir, file);
    const baseName = path.parse(file).name;
    const destWebp = path.join(imgDir, `${baseName}.webp`);

    const beforeStats = fs.statSync(srcPath);
    await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(destWebp);

    const afterStats = fs.statSync(destWebp);
    console.log(`[Img] ${file} (${Math.round(beforeStats.size / 1024)} KB) -> ${baseName}.webp (${Math.round(afterStats.size / 1024)} KB)`);
  }

  console.log('--- Optimizing Favicon / Title Icon ---');
  const titleSrc = path.resolve('img/title.png');
  if (fs.existsSync(titleSrc)) {
    const beforeStats = fs.statSync(titleSrc);
    // Create an optimized 128x128 PNG for title.png
    const tempOut = path.resolve('img/title_optimized.png');
    await sharp(titleSrc)
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, quality: 85 })
      .toFile(tempOut);

    fs.copyFileSync(tempOut, titleSrc);
    // Also place in public/img/title.png so it's directly accessible
    fs.copyFileSync(tempOut, path.resolve('public/img/title.png'));
    fs.unlinkSync(tempOut);

    const afterStats = fs.statSync(titleSrc);
    console.log(`[Favicon] title.png (${Math.round(beforeStats.size / 1024)} KB) -> (${Math.round(afterStats.size / 1024)} KB)`);
  }

  console.log('Image optimization complete!');
}

optimize().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
