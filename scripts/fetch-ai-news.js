// AI 新闻抓取脚本 - 支持历史记录
// 运行: node scripts/fetch-ai-news.js

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';

const AI_KEYWORDS = [
  'AI', 'artificial intelligence', 'OpenAI', 'GPT', 'Claude', 'Gemini', 
  'LLM', 'machine learning', 'deep learning', 'neural', 'ChatGPT', 
  'Anthropic', 'Google AI', 'Meta AI', 'Tesla', '自动驾驶', '大模型', '人工智能',
  'AI agent', 'RAG', 'vector database', 'prompt engineering', 'Sora', 'Runway',
  'Midjourney', 'Stable Diffusion', 'LLaMA', 'Mistral', 'Cursor', 'v0'
];

const HISTORY_DIR = join(process.cwd(), 'public', 'data', 'history');

async function fetchHNStories() {
  console.log('Fetching Hacker News stories...');
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const ids = await response.json();
    
    const stories = [];
    for (let i = 0; i < Math.min(100, ids.length); i++) {
      try {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`);
        const story = await res.json();
        if (story) stories.push(story);
      } catch (e) {
        console.error(`Failed to fetch story ${ids[i]}`);
      }
    }
    
    const aiStories = stories.filter(story => {
      if (!story?.title) return false;
      const titleLower = story.title.toLowerCase();
      return AI_KEYWORDS.some(k => titleLower.includes(k.toLowerCase()));
    });
    
    console.log(`Found ${aiStories.length} AI-related stories`);
    
    return aiStories.map(story => ({
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      source: 'Hacker News',
      time: story.time * 1000,
      score: story.score || 0,
      desc: story.text ? story.text.replace(/<[^>]*>/g, '').substring(0, 100) : ''
    }));
  } catch (e) {
    console.error('Failed to fetch HN:', e);
    return [];
  }
}

async function fetchRedditAI() {
  console.log('Fetching Reddit r/ArtificialIntelligence...');
  try {
    const response = await fetch('https://www.reddit.com/r/ArtificialIntelligence/new.json', {
      headers: { 'User-Agent': 'OpenClaws-NewsBot/1.0' }
    });
    const data = await response.json();
    
    if (!data?.data?.children) return [];
    
    return data.data.children
      .slice(0, 30)
      .map(child => child.data)
      .filter(post => !post.is_self || post.selftext.length > 50)
      .map(post => ({
        title: post.title,
        url: post.url || `https://reddit.com${post.permalink}`,
        source: 'Reddit AI',
        time: post.created_utc * 1000,
        score: post.score || 0,
        desc: post.selftext ? post.selftext.replace(/<[^>]*>/g, '').substring(0, 100) : ''
      }));
  } catch (e) {
    console.error('Failed to fetch Reddit:', e);
    return [];
  }
}

function saveHistory(newsData) {
  if (!existsSync(HISTORY_DIR)) {
    mkdirSync(HISTORY_DIR, { recursive: true });
  }
  
  const date = new Date().toISOString().split('T')[0];
  const historyFile = join(HISTORY_DIR, `${date}.json`);
  
  writeFileSync(historyFile, JSON.stringify(newsData, null, 2));
  console.log(`Saved history: ${historyFile}`);
}

async function main() {
  console.log('🤖 Starting AI news fetch...\n');
  
  const [hnStories, redditStories] = await Promise.all([
    fetchHNStories(),
    fetchRedditAI()
  ]);
  
  const allStories = [...hnStories, ...redditStories];
  const seen = new Set();
  const uniqueStories = allStories.filter(story => {
    const key = story.title.toLowerCase().substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  
  const latest = [...uniqueStories].sort((a, b) => b.time - a.time).slice(0, 20);
  const hot = [...uniqueStories].sort((a, b) => b.score - a.score).slice(0, 20);
  
  const newsData = {
    updated: new Date().toISOString(),
    latest,
    hot
  };
  
  // Save to current
  const outputPath = join(process.cwd(), 'public', 'data', 'ai-news.json');
  const dir = dirname(outputPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(outputPath, JSON.stringify(newsData, null, 2));
  
  // Save to history
  saveHistory(newsData);
  
  console.log(`\n✅ News updated at ${new Date().toISOString()}`);
  console.log(`   Latest: ${latest.length} items`);
  console.log(`   Hot: ${hot.length} items`);
}

main().catch(console.error);
