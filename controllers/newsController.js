var db = require('../database');
const { v4: uuidv4 } = require('uuid'),
    fs = require('fs'),
    path = require('path'),
    dd = require('dump-die');

/* index */
const index = (req, res, next) => {
    var query = `SELECT nc.name AS category_name, nc.id AS category_id, n.* 
    FROM news n LEFT JOIN news_categories nc ON n.news_category_id = nc.id 
    WHERE n.deleted_at IS NULL`;
    db.query(query, function (err, data) {
        if (err) { res.render('500'); }

        res.render('news/index', {
            title: 'News',
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* create */
const create = (req, res, next) => {
    var query = `SELECT * FROM news_categories WHERE deleted_at IS NULL AND status = 1`;
    db.query(query, (err, data) => {
        res.render('news/create', {
            title: 'News - Create',
            categories: data,
            req: req,
        });
    });
}

/* store */
const store = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var storeDir = '/images/news',
            dir = path.dirname(__dirname) + '/public' + storeDir;

        // If './public/images/news' not exist, create one
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Retrieve image information and generate new name
        var image = req.files.image,
            ext = path.extname(image.name),
            oldName = image.name,
            newName = uuidv4() + ext,
            uploadPath = dir + '/' + newName,
            storePath = storeDir + '/' + newName;

        // Use the mv() method to place the file somewhere on your server
        image.mv(uploadPath);

        // Finish uploading and rename to unique filename
        fs.rename(dir + '/' + oldName, dir + '/' + newName, () => { });

        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            q2 = {
                title: req.body.title,
                news_category_id: req.body.news_category_id,
                image: storePath,
                image_ext: ext,
                url: req.body.url,
                description: req.body.description,
                created_at: dt,
                updated_at: dt,
            };

        var query = "INSERT INTO news SET ?";

        db.query(query, q2);
        req.flash('msg', 'News has been created!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        dd(error);
        db.rollback();
        req.flash('msg', 'Failed to create record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/news/index");
}

/* edit */
const edit = (req, res, next) => {
    var id = req.params.id;
    var query = `SELECT * FROM news_categories WHERE deleted_at IS NULL; SELECT * FROM news WHERE id = "${id}";`;

    db.query(query, function (err, data) {
        if (err) throw err;

        var title = data[1][0].title + ' - Edit';
        res.render('news/edit', {
            title: title,
            categories: data[0],
            result: data[1][0],
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
            image = (req.files == null) ? null : req.files.image;

        // IF: new image uploaded, ELSE: no image uploaded
        // Retrieve image information and generate new name
        if (image != null) {
            var storeDir = '/images/news',
                dir = path.dirname(__dirname) + '/public' + storeDir;

            // If './public/images/news' not exist, create one
            if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

            var ext = path.extname(image.name),
                oldName = image.name,
                newName = uuidv4() + ext,
                uploadPath = dir + '/' + newName,
                storePath = storeDir + '/' + newName;

            // Use the mv() method to place the file somewhere on your server
            image.mv(uploadPath);

            // Finish uploading and rename to unique filename
            fs.rename(dir + '/' + oldName, dir + '/' + newName, () => { });
            console.log(uploadPath, storePath);
            var q2 = {
                title: req.body.title,
                news_category_id: req.body.news_category_id,
                image: storePath,
                image_ext: ext,
                url: req.body.url,
                description: req.body.description,
                updated_at: dt,
            };
        } else {
            var q2 = {
                title: req.body.title,
                news_category_id: req.body.news_category_id,
                // image: storePath,
                // image_ext: ext,
                url: req.body.url,
                description: req.body.description,
                updated_at: dt,
            };
        }

        var query = `UPDATE news SET ? WHERE id = "${req.params.id}"`;

        db.query(query, q2);
        req.flash('msg', 'News has been updated!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to update record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/news/index");
}

/* destroy */
const destroy = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            query = `UPDATE news SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;

        db.query(query);
        req.flash('msg', 'News has been deleted!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to delete record. Something went wrong!');
        req.flash('msg_type', 'error');
    }
    res.redirect("/news/index");
}

module.exports = { index, create, store, edit, update, destroy };