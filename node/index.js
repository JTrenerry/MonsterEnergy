const { Scraper, Root, CollectContent } = require('nodejs-web-scraper');

//(async () => {
//    const config = {
//        baseSiteUrl: `https://www.woolworths.com.au/shop/search/products?searchTerm=monster%20energy`,
//        startUrl: `https://www.woolworths.com.au/shop/search/products?searchTerm=monster%20energy`,           
//        headers: {
//            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
//
//        }, 
//    }
//
//    const mydivs = new Set();
//
//    const getElementContent = (content, pageaddress) => {
//        console.log(content);
//        console.log(pageaddress);
//        mydivs.add(content);
//    }
//
//    const scraper = new Scraper(config);
//
//    const root = new Root();
//    
//
//    const title = new CollectContent(`h1`, {name: `title`}); //any of these will fit.
//
//    root.addOperation(title);
//
//    await scraper.scrape(root);
//
//    console.log(mydivs);
//
//    return mydivs;
//
//})();
//


async function coles() {
   const config = {
        baseSiteUrl: `https://www.coles.com.au/search?q=monster%20energy`,
        startUrl: `https://www.coles.com.au/search?q=monster%20energy`,           
   }

    const mydivs = new Set();

    const regex = /SPECIAL\$\d+\.\d+\$\d+\.\d+ per \d{1,2}l(?:pick any \d+ for \$\d+\.\d+)?/g;

    const regex2 = /\s\$[\d.]+\sper\s1l/g;

    const getElementContent = (content, pageaddress) => {
        
        data = content.replace(regex, '');
        data = data.split('|')[1]; 
        data = data.replace("Add", "");
        data = data.replaceAll("$", " $");
        data = data.replace("500mL", "");
        data = data.replace("500ml", "");
        data = data.replace(regex2, " "); // not working 
        data = data.replace("4 Pack", " ").replace("4 pack", "");
        data = data.replace("for ", "for");
        data = data.trim();
        mydivs.add(data);
    }

    const scraper = new Scraper(config);

    const root = new Root();

    const title = new CollectContent(`.sc-9243a325-5, .iXddGd, .coles-targeting-ProductTileHeaderWrapper`, {getElementContent}); //any of these will fit.

    root.addOperation(title);

    await scraper.scrape(root);

    console.log(mydivs);

    return mydivs;

}

async function main() {
    var fs = require('fs');
    text = await coles();
    // removes the file
    fs.unlink('../src/output.txt', function (err) {
        if (err) throw err;
    });
    // writes to file
    for (var item of text) {
        fs.appendFile('../src/output.txt', item + '\n', function (err) {
            if (err) throw err;
        });
    }
}

main();
