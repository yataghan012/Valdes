import fs from 'fs';

const files = fs.readdirSync('./src/components').filter(f => f.endsWith('.tsx'));
const urls = new Set();

for (const file of files) {
  const content = fs.readFileSync(`./src/components/${file}`, 'utf-8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
  if (matches) {
    matches.forEach(m => urls.add(m));
  }
}

async function checkUrls() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`${res.status} ${url}`);
    } catch (e) {
      console.log(`ERROR ${url}`);
    }
  }
}

checkUrls();
