declare class WattpadScraper {
    /**
     * Reads the content of a specific Wattpad story chapter, including all available pages.
     * @param initialUrl - The URL of the chapter to read.
     * @returns A promise that resolves to an array of page contents.
     */
    read(initialUrl: string): Promise<Array<{
        pageNumber: number;
        url: string;
        content: string;
    }>>;

    /**
     * Gets all parts/chapters of a Wattpad story.
     * @param url - The URL of the story's main page.
     * @returns A promise that resolves to an array of story parts.
     */
    getParts(url: string): Promise<Array<{
        title: string;
        link: string;
    }>>;

    /**
     * Searches for stories on Wattpad.
     * @param query - The search query.
     * @returns A promise that resolves to an array of found stories.
     */
    search(query: string): Promise<Array<{
        title: string;
        author: string;
        link: string;
        thumbnail: string;
        reads: string;
        votes: string;
        parts: string;
        description: string;
    }>>;
}

export = WattpadScraper;
