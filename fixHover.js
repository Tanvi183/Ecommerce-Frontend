const fs = require('fs');
const path = require('path');

const replacements = [
  // Fix the erroneous hover:bg-gray-50 dark:bg-gray-800/50 to be dark:hover:bg-gray-700/50
  { search: /hover:bg-gray-50 dark:bg-gray-800\/50(\/50)?/g, replace: 'hover:bg-gray-50 dark:hover:bg-gray-700/50' },
  // Also check if there's any stray dark:bg-gray-800/50 that wasn't correctly formed
  { search: /dark:bg-gray-800\/50\/50/g, replace: 'dark:bg-gray-800/50' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const adminFiles = walk('./src/app/admin');

adminFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
  }
});
