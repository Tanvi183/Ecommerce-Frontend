const fs = require('fs');
const html = fs.readFileSync('velzon_content.html', 'utf8');
const start = html.indexOf('Ratings & Reviews');
if (start > -1) {
    console.log(html.substring(start - 50, start + 4000));
} else {
    console.log('Not found');
}
