const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');
const qs = require('querystring');
const formidable = require('formidable');

module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        fs.readFile(filePath, (error, data) => {
            if (error) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Whoops! File not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        fs.readFile(filePath, (error, data) => {
            if (error) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Whoops! File not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (error, data) => {
                if (error) {
                    throw error;
                }

                if (body.breed !== '') {
                    const breeds = JSON.parse(data);
                    breeds.push(body.breed);
                    const json = JSON.stringify(breeds);

                    fs.writeFile('./data/breeds.json', json, 'utf-8', () => {
                        console.log('The breed was added successfully!');

                    });
                }
            });
            res.writeHead(301, { location: '/' });
            res.end();
        });
    }
    else {
        return true;
    }
}


