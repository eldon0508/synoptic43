var db = require('../database');
const { v4: uuidv4 } = require('uuid'),
    fs = require('fs'),
    path = require('path'),
    dd = require('dump-die');

/* index */
const index = (req, res, next) => {
    var query = `SELECT * FROM charities WHERE deleted_at IS NULL`;
    db.query(query, function (err, data) {
        if (err) { res.render('500'); }

        res.render('charity/index', {
            title: 'Charity',
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* create */
const create = (req, res, next) => {
    res.render('charity/create', {
        title: 'Charity - Create',
        req: req,
    });
}

/* store */
const store = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var storeDir = '/images/charity',
            dir = path.dirname(__dirname) + '/public' + storeDir;

        // If './public/images/charity' not exist, create one
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
                name: req.body.name,
                address: req.body.address,
                official_url: req.body.official_url,
                google_map_url: req.body.official_url,
                image: storePath,
                image_ext: ext,
                status: req.body.status,
                created_at: dt,
                updated_at: dt,
            };

        var query = "INSERT INTO charities SET ?";

        db.query(query, q2);
        req.flash('msg', 'Charity has been created!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to create record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/charity/index");
}

/* edit */
const edit = (req, res, next) => {
    var id = req.params.id;
    var query = `SELECT * FROM charities WHERE id = "${id}"`;

    db.query(query, function (err, data) {
        if (err) throw err;

        var title = data[0].name + ' - Edit';
        res.render('charity/edit', {
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
            image = (req.files == null) ? null : req.files.image;

        // IF: new image uploaded, ELSE: no image uploaded
        // Retrieve image information and generate new name
        if (image != null) {
            var storeDir = '/images/community',
                dir = path.dirname(__dirname) + '/public' + storeDir;

            // If './public/images/community' not exist, create one
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
                name: req.body.name,
                address: req.body.address,
                official_url: req.body.official_url,
                google_map_url: req.body.official_url,
                image: storePath,
                image_ext: ext,
                status: req.body.status,
                updated_at: dt,
            };
        } else {
            var q2 = {
                name: req.body.name,
                address: req.body.address,
                official_url: req.body.official_url,
                google_map_url: req.body.official_url,
                // image: storePath,
                // image_ext: ext,
                status: req.body.status,
                updated_at: dt,
            };
        }

        var query = `UPDATE charities SET ? WHERE id = "${req.params.id}"`;

        db.query(query, q2);
        req.flash('msg', 'Charity has been updated!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to update record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/charity/index");
}

/* destroy */
const destroy = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            query = `UPDATE charities SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;

        db.query(query);
        req.flash('msg', 'Charity has been deleted!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to delete record. Something went wrong!');
        req.flash('msg_type', 'error');
    }
    res.redirect("/charity/index");
}

module.exports = { index, create, store, edit, update, destroy };