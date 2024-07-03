import { readFile } from 'fs/promises';
import { join } from 'path';

// Path to the JSON file
const jsonFilePath = join(process.cwd(), 'prices.json');

// Read the JSON file
try {
  const data = await readFile(jsonFilePath, 'utf8');
  const jsonData = JSON.parse(data);
  console.log('JSON data:', jsonData);
} catch (err) {
  console.error('Error reading or parsing the JSON file:', err);
}

