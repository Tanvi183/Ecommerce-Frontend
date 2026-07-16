const fs = require('fs');
const html = fs.readFileSync('velzon_add_product.html', 'utf8');

const matches = html.match(/<div[^>]*class="[^"]*page-content[^"]*"[^>]*>([\s\S]*?)<footer/i);
if (matches) {
    fs.writeFileSync('velzon_add_product_content.html', matches[1]);
    console.log("Success: ", matches[1].length);
} else {
    console.log("No match found");
}
