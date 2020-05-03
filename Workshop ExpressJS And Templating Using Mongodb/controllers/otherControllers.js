function getAbout(req, res) {
    const user = req.user;
    res.render('about.hbs', { user })
}

function notFound(req, res) {
    const user = req.user;
    res.render('404.hbs', { user })
}

module.exports = {
    getAbout,
    notFound
}