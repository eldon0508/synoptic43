var db = require('../database');
const dd = require('dump-die');

/* index */
const index = (req, res, next) => {
    var query = `SELECT * FROM courses WHERE deleted_at IS NULL; SELECT * FROM charities WHERE deleted_at IS NULL`;
    db.query(query, function (err, data) {
        if (err) { res.render('500'); }

        res.render('home/index', {
            courses: data[0],
            charities: data[1],
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

module.exports = { index };