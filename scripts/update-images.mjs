import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const propertiesDir = path.join(__dirname, '../src/content/properties');

// Unsplash-Bilder für verschiedene Immobilientypen
const imageMap = {
  'villa': [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center'
  ],
  'house': [
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center'
  ],
  'condo': [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center'
  ],
  'apartment': [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center'
  ],
  'studio': [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center'
  ],
  'townhouse': [
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center'
  ],
  'penthouse': [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center'
  ]
};

// Standard-Bilder für unbekannte Typen
const defaultImages = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&h=500&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop&crop=center'
];

function updatePropertyImages(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Bestimme den Immobilientyp
    const propertyType = data.type || 'apartment';
    const images = imageMap[propertyType] || defaultImages;
    
    // Aktualisiere die Bilder
    data.cover = images[0];
    data.images = images;
    
    // Schreibe die aktualisierte Datei
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Updated: ${path.basename(filePath)}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Finde alle JSON-Dateien mit Platzhalter-Bildern
const files = fs.readdirSync(propertiesDir)
  .filter(file => file.endsWith('.json'))
  .map(file => path.join(propertiesDir, file));

let updated = 0;
let errors = 0;

console.log('🔄 Updating property images...\n');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('/images/sample/')) {
    if (updatePropertyImages(file)) {
      updated++;
    } else {
      errors++;
    }
  }
}

console.log(`\n📊 Summary:`);
console.log(`✅ Updated: ${updated} files`);
console.log(`❌ Errors: ${errors} files`);
console.log(`🎉 All property images updated with real Unsplash images!`);
