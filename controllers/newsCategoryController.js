var db = require('../database');

/* index */
const index = (req, res, next) => {
    var query = `SELECT * FROM news_categories WHERE deleted_at IS NULL`;
    db.query(query, function (err, data) {
        if (err) { res.render('500'); }

        res.render('newsCategory/index', {
            title: 'News Category',
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* create */
const create = (req, res, next) => {
    res.render('newsCategory/create', {
        title: 'Category - Create',
        req: req,
    });
}

/* store */
const store = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            q2 = {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                created_at: dt,
                updated_at: dt,
            };

        var query = "INSERT INTO news_categories SET ?";

        db.query(query, q2);
        req.flash('msg', 'News Category has been created!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to create record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/newsCategory/index");
}

/* edit */
const edit = (req, res, next) => {
    var id = req.params.id;
    var query = `SELECT * FROM news_categories WHERE id = "${id}"`;

    db.query(query, function (err, data) {
        if (err) throw err;

        var title = data[0].name + ' - Edit';
        res.render('newsCategory/edit', {
            title: title,
            result: data[0],
            req: req,
        });
    });
}

/* update */
const update = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            q2 = {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                updated_at: dt,
            };

        var query = `UPDATE news_categories SET ? WHERE id = "${req.params.id}"`;

        db.query(query, q2);
        req.flash('msg', 'News Category has been updated!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to update record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/newsCategory/index");
}

/* destroy */
const destroy = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            query = `UPDATE news_categories SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;

        db.query(query);
        req.flash('msg', 'News Category has been deleted!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to delete record. Something went wrong!');
        req.flash('msg_type', 'error');
    }
    res.redirect("/newsCategory/index");
}

module.exports = { index, create, store, edit, update, destroy };