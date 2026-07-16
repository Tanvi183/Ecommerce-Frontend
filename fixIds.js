const fs = require('fs');

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
  
  // Replace object._id with (object._id || object.id) to support both Mongoose and Prisma backends smoothly
  content = content.replace(/(\w+)\._id(?!\s*\|\|)/g, '($1._id || $1.id)');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Patched IDs in: ${file}`);
  }
});
