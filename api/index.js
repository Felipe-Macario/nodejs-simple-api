const http = require('http');
const Url = require('url');

const data = require('./urls.json');
const urlManager = require('./urlManager');
const utils = require('./utils');

http.createServer(onRequest).listen(3000, () => console.log('Api is running'));

function onRequest (req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })

    var { name, url } = Url.parse(req.url, true).query;

    const urlRoute = req.url;
    var route = Url.parse(req.url).pathname;

    switch(route) {
        case '/':
            console.log(urlRoute + ' - Index');
            break;
        case '/create':
            console.log(urlRoute + ' - Create');

            if(name && url){
                url = utils.stringSlicer(String(url));
                data.urls.push({name, url});
                return urlManager.insertUrl((message) => res.end(message));
            }
            break;
        case '/delete':
            console.log(urlRoute + ' - Delete');

            if(url) {
                data.urls = data.urls.filter(item => {
                    const slicedItemUrl = utils.stringSlicer(String(item.url));
                    const slicedUrlToDelete = utils.stringSlicer(String(url));

                    return slicedItemUrl !== slicedUrlToDelete;
                });

                return urlManager.deleteUrl((message) => res.end(message));
            }
            break;
        default:
            console.log(urlRoute + ' - Trying to access a non existant route');
            return res.end(JSON.stringify({}));
    }

    return res.end(JSON.stringify(data));
}