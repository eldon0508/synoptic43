var db = require('../database');
const { v4: uuidv4 } = require('uuid'),
    fs = require('fs'),
    path = require('path'),
    dd = require('dump-die');

/* index */
const index = (req, res, next) => {
    var query = `SELECT * FROM courses WHERE deleted_at IS NULL`;
    db.query(query, function (err, data) {
        if (err) { res.render('500'); }

        res.render('course/index', {
            title: 'Course',
            results: data,
            msg_type: req.flash('msg_type'),
            msg: req.flash('msg'),
            req: req,
        });
    });
}

/* create */
const create = (req, res, next) => {
    res.render('course/create', {
        title: 'Course - Create',
        req: req,
    });
}

/* store */
const store = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var storeDir = '/images/course',
            dir = path.dirname(__dirname) + '/public' + storeDir;

        // If './public/images/course' not exist, create one
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
                status: req.body.status,
                url: req.body.url,
                image: storePath,
                image_ext: ext,
                organiser: req.body.organiser,
                description: req.body.description,
                created_at: dt,
                updated_at: dt,
            };

        var query = "INSERT INTO courses SET ?";

        db.query(query, q2);
        req.flash('msg', 'Course has been created!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to create record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/course/index");
}

/* edit */
const edit = (req, res, next) => {
    var id = req.params.id;
    var query = `SELECT * FROM courses WHERE id = "${id}"`;

    db.query(query, function (err, data) {
        if (err) throw err;

        var title = data[0].title + ' - Edit';
        res.render('course/edit', {
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
            var storeDir = '/images/course',
                dir = path.dirname(__dirname) + '/public' + storeDir;

            // If './public/images/course' not exist, create one
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
            var d = new Date(),
                dt = d.toISOString().replace('T', ' ').substring(0, 19),
                q2 = {
                    title: req.body.title,
                    status: req.body.status,
                    url: req.body.url,
                    image: storePath,
                    image_ext: ext,
                    organiser: req.body.organiser,
                    description: req.body.description,
                    created_at: dt,
                    updated_at: dt,
                };
        } else {
            var d = new Date(),
                dt = d.toISOString().replace('T', ' ').substring(0, 19),
                q2 = {
                    title: req.body.title,
                    status: req.body.status,
                    url: req.body.url,
                    // image: storePath,
                    // image_ext: ext,
                    organiser: req.body.organiser,
                    description: req.body.description,
                    updated_at: dt,
                };
        }

        var query = `UPDATE courses SET ? WHERE id = "${req.params.id}"`;

        db.query(query, q2);
        req.flash('msg', 'Course has been updated!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to update record. Something went wrong!');
        req.flash('msg_type', 'error');
    }

    res.redirect("/course/index");
}

/* destroy */
const destroy = async (req, res, next) => {
    await db.beginTransaction();

    try {
        var d = new Date(),
            dt = d.toISOString().replace('T', ' ').substring(0, 19),
            query = `UPDATE courses SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;

        db.query(query);
        req.flash('msg', 'Course has been deleted!');
        req.flash('msg_type', 'success');
        db.commit();
    } catch (error) {
        db.rollback();
        req.flash('msg', 'Failed to delete record. Something went wrong!');
        req.flash('msg_type', 'error');
    }
    res.redirect("/course/index");
}

module.exports = { index, create, store, edit, update, destroy };