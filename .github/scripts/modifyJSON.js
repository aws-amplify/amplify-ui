const fs = require('fs');

// Function to remove comments from a string
function removeComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1'); // remove /* ... */ and // ... style comments from the string
}

// Read command line arguments
const [, , file, action, option] = process.argv;

// Check if required arguments are provided
if (!file || !option) {
  console.log('Usage: node modifyJSON.js <file> <option>');
  process.exit(1);
}

// Read the JSON file
const data = fs.readFileSync(file, 'utf8');
const strippedData = removeComments(data);
let json = JSON.parse(strippedData);

// Parse the option parameter
const [path, value] = option.split(' ');

// Modify JSON based on the action
if (action === 'add') {
  // Get the property value to add
  const propertyValue = JSON.parse(value);
  // Traverse the path and add the property value
  let current = json;
  const keys = path.split('.');
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] || {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = propertyValue;
} else if (action === 'delete') {
  // Traverse the path and delete the property
  let current = json;
  const keys = path.split('.');

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      console.log('Error: Invalid path');
      process.exit(1);
    }
    current = current[key];
  }

  delete current[keys[keys.length - 1]];
} else {
  console.log('Error: Invalid action');
  process.exit(1);
}

// Write the modified JSON back to the file
const modifiedData = JSON.stringify(json, null, 2);
fs.writeFileSync(file, modifiedData, 'utf8');

console.log(`JSON file '${file}' modified successfully.`);
