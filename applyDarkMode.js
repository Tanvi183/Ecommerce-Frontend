const fs = require('fs');
const path = require('path');

const replacements = [
  { search: /bg-\[#f4f7fc\](?! dark:)/g, replace: 'bg-[#f4f7fc] dark:bg-gray-900' },
  { search: /bg-white(?! dark:)/g, replace: 'bg-white dark:bg-gray-800' },
  { search: /bg-\[#f8f9fa\](?! dark:)/g, replace: 'bg-[#f8f9fa] dark:bg-gray-900/50' },
  { search: /bg-gray-50(?! dark:)/g, replace: 'bg-gray-50 dark:bg-gray-800/50' },
  { search: /hover:bg-gray-50(?! dark:)/g, replace: 'hover:bg-gray-50 dark:hover:bg-gray-700/50' },
  { search: /hover:bg-gray-100(?! dark:)/g, replace: 'hover:bg-gray-100 dark:hover:bg-gray-700' },
  { search: /text-\[#6c757d\](?! dark:)/g, replace: 'text-[#6c757d] dark:text-gray-400' },
  { search: /text-\[#6b7280\](?! dark:)/g, replace: 'text-[#6b7280] dark:text-gray-400' },
  { search: /text-\[#333333\](?! dark:)/g, replace: 'text-[#333333] dark:text-gray-200' },
  { search: /text-gray-800(?! dark:)/g, replace: 'text-gray-800 dark:text-gray-100' },
  { search: /text-gray-700(?! dark:)/g, replace: 'text-gray-700 dark:text-gray-200' },
  { search: /text-gray-600(?! dark:)/g, replace: 'text-gray-600 dark:text-gray-300' },
  { search: /text-gray-500(?! dark:)/g, replace: 'text-gray-500 dark:text-gray-400' },
  { search: /border-gray-100(?! dark:)/g, replace: 'border-gray-100 dark:border-gray-800' },
  { search: /border-gray-200(?! dark:)/g, replace: 'border-gray-200 dark:border-gray-700' },
  { search: /border-gray-300(?! dark:)/g, replace: 'border-gray-300 dark:border-gray-600' },
  { search: /bg-\[#186675\](?! text-)/g, replace: 'bg-[#186675] dark:bg-gray-950' },
  { search: /bg-\[#13525e\](?! dark:)/g, replace: 'bg-[#13525e] dark:bg-gray-800' },
  { search: /border-\[#217584\](?! dark:)/g, replace: 'border-[#217584] dark:border-gray-800' },
  { search: /bg-\[#f3f4f7\](?! dark:)/g, replace: 'bg-[#f3f4f7] dark:bg-gray-900' },
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
    console.log(`Updated: ${file}`);
  }
});

console.log('Dark mode classes applied.');
