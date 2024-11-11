declare class WattpadScraper {
    read(initialUrl: string): Promise<Array<{
        pageNumber: number,
        url: string,
        content: string
    }>>;
    getParts(url: string): Promise<Array<{ title: string, link: string }>>;
    search(query: string): Promise<Array<{
        title: string,
        author: string,
        link: string,
        thumbnail: string,
        reads: string,
        votes: string,
        parts: string,
        description: string
    }>>;
}

export = WattpadScraper;