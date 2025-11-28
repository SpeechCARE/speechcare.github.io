import fs from "fs";
import path from "path";
import crypto from "crypto";

const imagesDir = path.join(process.cwd(), "public", "images");
const publicationsPath = path.join(process.cwd(), "src", "data", "publications.json");

// Hash a file's content
function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("md5").update(buffer).digest("hex").slice(0, 8);
  return hash;
}

// Read publications.json
let publications = JSON.parse(fs.readFileSync(publicationsPath, "utf8"));

// Process images
publications = publications.map((pub) => {
  if (!pub.image) return pub;

  const oldImagePath = path.join(imagesDir, path.basename(pub.image));
  if (!fs.existsSync(oldImagePath)) return pub;

  const ext = path.extname(oldImagePath);
  const name = path.basename(oldImagePath, ext);

  const hash = hashFile(oldImagePath);

  const newFilename = `${name}.${hash}${ext}`;
  const newImagePath = path.join(imagesDir, newFilename);

  // Copy or rename the file
  fs.copyFileSync(oldImagePath, newImagePath);

  // Update JSON path
  pub.image = `/images/${newFilename}`;

  return pub;
});

// Save updated publications.json
fs.writeFileSync(publicationsPath, JSON.stringify(publications, null, 2));

console.log("Images versioned successfully!");
console.log("publications.json updated!");
