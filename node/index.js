const { Scraper, Root, CollectContent } = require('nodejs-web-scraper');

async function coles() {
   const config = {
        baseSiteUrl: `https://www.coles.com.au/search?q=monster%20energy`,
        startUrl: `https://www.coles.com.au/search?q=monster%20energy`,   
        logPath: './logs',
        showConsoleLogs:false,        
        headers: {
            'User-Agent': `curl/7.87.0`,
            'accept': '*/*',
        }, 
   }
    const mydivs = new Set();

    const regex = /SPECIAL\$\d+\.\d+\$\d+\.\d+ per \d{1,2}l(?:pick any \d+ for \$\d+\.\d+)?/g;

    const regex2 = /\$\d+\.\d+\s+per\s+1L/g;

    const regex3 = /Save\s.*$/g;

    const getElementContent = (content, pageaddress) => {
    
        data = content.replace(regex, '');
        data = data.split('|')[1]; 
        data = data.replace("Add", "");
        data = data.replaceAll("$", " $");
        data = data.replace("500mL", "");
        data = data.replace("500ml", "");
        data = data.replace(regex2, " "); // not working 
        data = data.replace("4 pack", "4 Pack").replace("4 Pack", "");
        data = data.replace("for ", "for");
        data = data.replace("SPECIAL", "");
        data = data.replace("Currently unavailable", "");
        data = data.replace(regex3, "");
        data = data.replace(" Pick", "Pick");
        data = data.replace("NEW ", "");
        data = data.trim();
        mydivs.add(data);
    }

    const scraper = new Scraper(config);

    const root = new Root();

    const title = new CollectContent(`.coles-targeting-ProductTileHeaderWrapper`, {getElementContent});

    root.addOperation(title);

    await scraper.scrape(root);

    return mydivs;

}

async function main() {
    var fs = require('fs');
    text = await coles();
    // writes to file
    fs.writeFile('./output.txt', "", function (err) {
        if (err) throw err;
    });

    fs.appendFile('./output.txt', "UQ:\nVending Machine - $3\nEzy Mart - $4.99\n", function (err) {
        if (err) throw err;
    });

    fs.appendFile('./output.txt', "\nColes:\n", function (err) {
        if (err) throw err;
    });

    for (var item of text) {
        fs.appendFile('./output.txt', item + "\n", function (err) {
            if (err) throw err;
        });
    }
}

main();