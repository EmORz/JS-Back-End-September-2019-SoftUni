const jwt = require('jsonwebtoken');

function getAll(req, res) {
    jwt.verify(res.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.redirect('/register');
            return;
        } else {
            const { isLogged } = res.body;
            res.render('home', { isLogged });
        }
    })

}

module.exports = {
    getAll
}