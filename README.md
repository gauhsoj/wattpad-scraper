# Wattpad Scraper

A powerful Node.js library for scraping Wattpad stories, chapters, and search results. This package provides an easy-to-use interface for accessing Wattpad content programmatically.

## Installation

```bash
npm install wattpad-scraper
```
To update:

```bash
npm install wattpad-scraper@latest
```

## Features

- 📖 Read story chapters (with multi-page support)
- 📑 Get all parts/chapters of a story
- 🔍 Search for stories
- ⚡ Promise-based API
- 🔄 CommonJS and ES Module support
- 📘 TypeScript support


## Usage

### JavaScript (CommonJS)

```javascript
 const WattpadScraper = require('wattpad-scraper');

const scraper = new WattpadScraper();

// Read a chapter (including all pages)
async function readChapter() {
  try {
    const initialUrl = 'https://www.wattpad.com/1362020763-hell-university-chapter-01';
    const pages = await scraper.read(initialUrl);

    pages.forEach(page => {
      console.log(`Page ${page.pageNumber}: ${page.url}`);
      console.log(page.content + "\n");
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}
  

// Get all parts of a story
async function getStoryParts() {
  try {
    const parts = await scraper.getParts('https://www.wattpad.com/story/346558088-hell-university');
    parts.forEach((part, index) => {
      console.log(`${index + 1}. ${part.title}`);
      console.log(`   Link: ${part.link}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Search for stories
async function searchStories() {
  try {
    const stories = await scraper.search('Hell University');
    stories.forEach((story, index) => {
      console.log(`\n${index + 1}. ${story.title}`);
      console.log(`Author: ${story.author}`);
      console.log(`Thumbnail: ${story.thumbnail}`);
      console.log(`Link: ${story.link}`);
      console.log(`Reads: ${story.reads}`);
      console.log(`Votes: ${story.votes}`);
      console.log(`Parts: ${story.parts}`);
      console.log(`Description: ${story.description}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
readChapter();
getStoryParts();
searchStories();

```

### TypeScript

```typescript
 import WattpadScraper from 'wattpad-scraper';

const scraper = new WattpadScraper();

async function readChapter(): Promise<void> {
  try {
    const pages = await scraper.read('https://www.wattpad.com/1362020763-hell-university-chapter-01');
    pages.forEach(page => {
      console.log(`\nPage ${page.pageNumber}:`);
      console.log(`URL: ${page.url}`);
      console.log(`Content: ${page}`);
    });
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

async function getStoryParts(): Promise<void> {
  try {
    const parts = await scraper.getParts('https://www.wattpad.com/story/346558088-hell-university');
    parts.forEach((part, index) => {
      console.log(`${index + 1}. ${part.title}`);
      console.log(`   Link: ${part.link}`);
    });
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

async function searchStories(): Promise<void> {
  try {
    const stories = await scraper.search('Hell University');
    stories.forEach((story, index) => {
      console.log(`\n${index + 1}. ${story.title}`);
      console.log(`Author: ${story.author}`);
      console.log(`Thumbnail: ${story.thumbnail}`);
      console.log(`Link: ${story.link}`);
      console.log(`Reads: ${story.reads}`);
      console.log(`Votes: ${story.votes}`);
      console.log(`Parts: ${story.parts}`);
      console.log(`Description: ${story.description}`);
    });
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

// Example usage
readChapter();
getStoryParts();
searchStories();

```

## API Reference

### `read(url: string): Promise<Array<{pageNumber: number, url: string, content: string}>>`

Reads the content of a specific Wattpad story chapter, including all available pages.

- `url`: The URL of the chapter to read
- Returns: Promise resolving to an array of page objects, each containing:

- `pageNumber`: The page number
- `url`: The URL of the specific page
- `content`: The text content of the page





### `getParts(url: string): Promise<Array<{title: string, link: string}>>`

Gets all parts/chapters of a Wattpad story.

- `url`: The URL of the story's main page
- Returns: Promise resolving to an array of story parts with `title` and `link` properties


### `search(query: string): Promise<Array<{title: string, author: string, link: string, thumbnail: string, reads: string, votes: string, parts: string, description: string}>>`

Searches for stories on Wattpad.

- `query`: The search query
- Returns: Promise resolving to an array of found stories with properties:

- `title`: Story title
- `author`: Author username
- `link`: Story URL
- `thumbnail`: Cover image URL
- `reads`: Number of reads
- `votes`: Number of votes
- `parts`: Number of parts
- `description`: Story description





## License

MIT © Deku

## Author

Created by [Deku](https://facebook.com/joshg101)