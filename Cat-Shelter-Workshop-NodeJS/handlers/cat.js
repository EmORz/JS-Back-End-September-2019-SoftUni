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

            const catBreedPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
            const modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(modifiedData);
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
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (error, fields, files) => {

            if (error) {
                console.log(error);
                throw error;
            }

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload.name));      

            fs.copyFile(oldPath, newPath, function (err) {
                console.log('Files was uploaded successfully!');
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {

                if (err) {
                    console.log(err);
                    throw err;
                }

                let allCats = JSON.parse(data);
                allCats.push({ id: allCats.length + 1, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(301, { location: '/' });
                    res.end();
                });
            });
        });
    }
    else {
        return true;
    }
}


