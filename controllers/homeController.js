var db = require('../database');
const dd = require('dump-die');
const url = require('url');

/* home */
const index = (req, res, next) => {
    var query = `SELECT nc.name AS category_name, n.* FROM news n LEFT JOIN news_categories nc ON n.news_category_id = nc.id WHERE n.deleted_at IS NULL ORDER BY n.created_at DESC LIMIT 4;
    SELECT * FROM courses WHERE deleted_at IS NULL AND status = 1 ORDER BY id DESC LIMIT 8; 
    SELECT * FROM charities WHERE deleted_at IS NULL AND status = 1 LIMIT 4;
    SELECT * FROM communities WHERE deleted_at IS NULL AND status = 1 LIMIT 4;
    SELECT * FROM reviews WHERE deleted_at IS NULL AND status = 1`;

    db.query(query, function (err, data) {
        if (err) { dd(err); }

        // Retrieve full URL when redirect
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // Create new URL object
        const current_url = new URL(fullUrl);
        // get access to URLSearchParams object
        const search_params = current_url.searchParams;
        var lang = search_params.get('lang');

        console.log(fullUrl, current_url, lang);

        res.render('home/index', {
            lang: lang,
            news: data[0],
            courses: data[1],
            charities: data[2],
            communities: data[3],
            reviews: data[4],
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* News Index */
const newsIndex = (req, res, next) => {
    var query = `SELECT nc.name AS category_name, n.* FROM news n LEFT JOIN news_categories nc ON n.news_category_id = nc.id WHERE n.deleted_at IS NULL ORDER BY n.created_at DESC`;

    // Retrieve full URL when redirect
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // Create new URL object
    const current_url = new URL(fullUrl);
    // get access to URLSearchParams object
    const search_params = current_url.searchParams;
    var lang = search_params.get('lang');

    console.log(fullUrl, current_url, lang);
    db.query(query, function (err, data) {
        if (err) { dd(err); }

        res.render('home/news', {
            lang: lang,
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* Courses Index */
const courseIndex = (req, res, next) => {
    var query = `SELECT * FROM courses WHERE deleted_at IS NULL AND status = 1 ORDER BY id DESC;`;
    // Retrieve full URL when redirect
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // Create new URL object
    const current_url = new URL(fullUrl);
    // get access to URLSearchParams object
    const search_params = current_url.searchParams;
    var lang = search_params.get('lang');

    console.log(fullUrl, current_url, lang);
    db.query(query, function (err, data) {
        if (err) { dd(err); }

        res.render('home/course', {
            lang: lang,
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* Communities Index */
const communityIndex = (req, res, next) => {
    var query = `SELECT * FROM communities WHERE deleted_at IS NULL AND status = 1`;
    // Retrieve full URL when redirect
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // Create new URL object
    const current_url = new URL(fullUrl);
    // get access to URLSearchParams object
    const search_params = current_url.searchParams;
    var lang = search_params.get('lang');

    console.log(fullUrl, current_url, lang);
    
    db.query(query, function (err, data) {
        if (err) { dd(err); }

        res.render('home/community', {
            lang: lang,
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

module.exports = { index, newsIndex, courseIndex, communityIndex };
