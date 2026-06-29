const { Jimp } = require('jimp');
const path = require('path');

async function main() {
  const inputPath = path.join(__dirname, 'public', 'images', 'logo.jpg');
  const outputPath = path.join(__dirname, 'public', 'images', 'logo.png');

  console.log('Reading image from:', inputPath);
  const image = await Jimp.read(inputPath);

  // Scan all pixels and set white pixels to transparent
  // We define "white" as r, g, b values above 240
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    
    // Check if it is very close to white
    if (red > 240 && green > 240 && blue > 240) {
      // Set alpha to 0 (transparent)
      this.bitmap.data[idx + 3] = 0;
    }
  });

  console.log('Saving transparent image to:', outputPath);
  await image.write(outputPath);
  console.log('Done!');
}

main().catch(err => {
  console.error('Error during image processing:', err);
});
