const axios = require('axios');
const cheerio = require('cheerio');

class WattpadScraper {
    /**
     * Reads the content of a specific Wattpad story chapter
     * @param {string} url - The URL of the chapter to read
     * @returns {Promise<string>} - The extracted text content
     */
    async read(url) {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            const paragraphs = $('p[data-p-id]');

            return paragraphs
                .map((_, element) => $(element).text().trim())
                .get()
                .join(' ');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Gets all parts/chapters of a Wattpad story
     * @param {string} url - The URL of the story's main page
     * @returns {Promise<Array<{title: string, link: string}>>} - Array of story parts
     */
    async getParts(url) {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            const tableOfContents = $('.table-of-contents .story-parts ul');
            const storyParts = [];

            tableOfContents.find('li').each((_, element) => {
                const $element = $(element);
                const title = $element.find('.part-title').text().trim();
                const link = 'https://www.wattpad.com' + $element.find('a').attr('href');
                storyParts.push({ title, link });
            });

            return storyParts;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Searches for stories on Wattpad
     * @param {string} query - The search query
     * @returns {Promise<Array<{title: string, author: string, link: string, thumbnail: string, reads: string, votes: string, parts: string, description: string}>>} - Array of found stories
     */
    async search(query) {
        try {
            const response = await axios.get(`https://www.wattpad.com/search/${encodeURIComponent(query)}`);
            const html = response.data;
            const $ = cheerio.load(html);
            const storyCards = $('.story-card');

            return storyCards.map((_, element) => {
                const $element = $(element);
                const title = $element.find('.title').text().trim();
                const link = 'https://www.wattpad.com' + $element.attr('href');
                const description = $element.find('.description').text().trim();
                const thumbnail = $element.find('.cover img').attr('src') || '';
                const stats = $element.find('.new-story-stats .stats-item');
                let reads = '', votes = '', parts = '';

                stats.each((_, stat) => {
                    const label = $(stat).find('.stats-label__text').text().trim().toLowerCase();
                    const value = $(stat).find('.stats-value').text().trim();
                    if (label === 'reads') reads = value;
                    if (label === 'votes') votes = value;
                    if (label === 'parts') parts = value;
                });

                const author = $element.find('.username').text().trim();
                return { title, author, link, thumbnail, reads, votes, parts, description };
            }).get();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = WattpadScraper;