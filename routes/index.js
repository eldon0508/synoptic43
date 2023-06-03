
const express = require('express'),
  router = express.Router(),
  db = require('../database'),
  bcrypt = require('bcrypt'),
  saltRounds = 10,
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


/* Protecting routes declaration */
function isAuth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.flash('msg', 'Unauthorised access! Please login!');
  req.flash('msg_type', 'error');
  res.redirect('/login');
}
function isManager(req, res, next) {
  if (req.user.role == 1) { return next(); }
  req.flash('msg', 'Unauthorised! Manager access required!');
  req.flash('msg_type', 'warning');
  res.redirect('back');
}
function isStaff(req, res, next) {
  if (req.user.role == 1 || req.user.role == 2) { return next(); }
  req.flash('msg', 'Unauthorised access! Please login!');
  req.flash('msg_type', 'error');
  res.redirect('/login');
}
function isGuest(req, res, next) {
  if (req.isUnauthenticated()) { return next(); }
  req.flash('msg', 'Unauthorised access!');
  req.flash('msg_type', 'error');
  res.redirect('/');
}
/* Protecting routes */


/* login index */
router.get('/login', isGuest, (req, res, next) => {
  res.render('auth/login', {
    msg_type: req.flash('msg_type'),
    msg: req.flash('msg'),
  });
});

/* login post */
router.post('/login', isGuest, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

/* logout */
router.get('/logout', isAuth, function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }

    req.flash('msg', 'Logout successful!');
    req.flash('msg_type', 'success');
    res.redirect('/login');
  });
});

/* Home page. */
router.get('/', isAuth, function (req, res, next) {
  res.render('index', {
    title: 'Dashboard',
    msg_type: req.flash('msg_type'),
    msg: req.flash('msg'),
    req: req,
  });
});

/* Profile page. */
router.get('/profile', isAuth, function (req, res, next) {
  var query = `SELECT * FROM admins WHERE id = ${req.user.id}`;

  db.query(query, (err, data) => {
    res.render('auth/profile', {
      title: 'Profile - Edit',
      result: data[0],
      msg_type: req.flash('msg_type'),
      msg: req.flash('msg'),
      req: req,
    });
  });
});

/* Profile update page. */
router.post('/profile/update', isAuth, async function (req, res, next) {
  await db.beginTransaction();

  try {
    var pass = (req.body.password == "") ? null : req.body.password;
    console.log(pass);
    if (pass != null) {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        var d = new Date(),
          dt = d.toISOString().replace('T', ' ').substring(0, 19),
          q2 = {
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob,
            address: req.body.address,
            updated_at: dt,
          };

        var query = `UPDATE admins SET ? WHERE id = "${req.body.user_id}"`;
        db.query(query, q2);

        db.commit();
        req.logout(function (err) {
          req.flash('msg_type', 'success');
          req.flash('msg', 'Profile has been updated! Please relogin.');
          res.redirect('/login');
        });
      });

    } else {
      var d = new Date(),
        dt = d.toISOString().replace('T', ' ').substring(0, 19),
        q2 = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dob: req.body.dob,
          address: req.body.address,
          updated_at: dt,
        };

      var query = `UPDATE users SET ? WHERE id = "${req.user.id}"`;
      db.query(query, q2);

      db.commit();
      req.flash('msg', 'Profile has been updated!');
      req.flash('msg_type', 'success');
      res.redirect('/profile');
    }

  } catch (error) {
    console.log(error);
    db.rollback();
    req.flash('msg', 'Failed to update record. Something went wrong!');
    req.flash('msg_type', 'error');
    res.redirect("/profile");
  }
});

// Passport local initialisation, using IStrategyOptionsWithRequest
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, username, password, done) => {
  var query = `SELECT * FROM admins WHERE username = "${username}" AND deleted_at IS NULL`;
  db.query(query, function (err, data) {
    if (data.length <= 0) {   // No account found
      req.flash('msg', 'Account not found.');
      req.flash('msg_type', 'error');
      return done(null, false);
    }

    bcrypt.compare(password, data[0].password).then(function (result) {
      if (!result) {    // Found, but incorrect password
        req.flash('msg', 'Incorrect password.');
        req.flash('msg_type', 'error');
        return done(null, false);
      } else {
        req.flash('msg', 'Welcome back!');
        req.flash('msg_type', 'success');
        return done(null, data[0]);
      }
    });
  });
}));

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, {
      id: user.id,
      username: user.username,
      name: user.first_name + " " + user.last_name,
      role: 'admin',
    });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

module.exports = router;