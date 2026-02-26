// 生成历史新闻索引
// 运行: node scripts/build-search-index.js

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const HISTORY_DIR = join(process.cwd(), 'public', 'data', 'history');
const OUTPUT_FILE = join(process.cwd(), 'public', 'data', 'search-index.json');

function buildSearchIndex() {
  if (!existsSync(HISTORY_DIR)) {
    console.log('No history directory found');
    return;
  }
  
  const files = readdirSync(HISTORY_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} history files`);
  
  const allNews = [];
  
  for (const file of files) {
    try {
      const data = JSON.parse(readFileSync(join(HISTORY_DIR, file), 'utf-8'));
      const date = file.replace('.json', '');
      
      if (data.latest) {
        data.latest.forEach(item => {
          allNews.push({ 
            ...item, 
            date, 
            type: 'latest',
            searchText: `${item.title} ${item.desc} ${item.source}`.toLowerCase()
          });
        });
      }
      if (data.hot) {
        data.hot.forEach(item => {
          allNews.push({ 
            ...item, 
            date, 
            type: 'hot',
            searchText: `${item.title} ${item.desc} ${item.source}`.toLowerCase()
          });
        });
      }
    } catch (e) {
      console.error(`Failed to read ${file}:`, e);
    }
  }
  
  // Sort by time
  allNews.sort((a, b) => b.time - a.time);
  
  writeFileSync(OUTPUT_FILE, JSON.stringify({
    updated: new Date().toISOString(),
    total: allNews.length,
    news: allNews
  }, null, 2));
  
  console.log(`✅ Built search index: ${allNews.length} news items`);
}

buildSearchIndex();
