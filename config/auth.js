module.exports = {

    //Function which authenicate that user is signed up
    ensureAuthenticated: function (req, res, next) {

        if (req.isAuthenticated()) {

            return next();
        }

        else {

            req.flash('error_msg', 'Please log in to view that resource');
            res.redirect('/users/login');
        }
    },

    //Function which forward user to sign up  
    forwardAuthenticated: function (req, res, next) {

        if (!req.isAuthenticated()) {

            return next();
        }
        res.redirect('/dashboard');
    }

};
