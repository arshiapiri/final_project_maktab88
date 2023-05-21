const { join } = require('node:path');
const Users = require("../models/Users");

module.exports.login = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect("/profile");
    }

    res.render(join(__dirname, '../views/login.ejs'));
};

module.exports.Signup = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect("/profile");
    }

    res.render(join(__dirname, '../views/signup.ejs'));
};

module.exports.renderUserProfile = async (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    const user = {
        fristName,
        lastName,
        username,
        password,
        gender,
        phoneNumber,
        roleIn
    } = await Users.findById(req.session.user._id);
    res.render(join(__dirname, "../views/userProfile.ejs"), { user }
    )
}

module.exports.updateUser = async (req, res, next) => {
  try {
      const fields = {
          fristName,
          lastName,
          gender,
          username
      } = req.body;

      let user = await Users.findOne({
          username: fields.username,
      });
      if (!user) {
          return next(new AppError(400, 'username not found'));
      }

      req.session.user = { _id: user._id };
      const updating = await Users.findByIdAndUpdate(
          req.session.user._id,
          fields,
          {
              new: true,
          }
      );
      res.render("profile", { user: req.session.user });
  } catch (error) {
      
  }
};

module.exports.uploadAvatar = (req, res, next) => {
    const uploadUserAvatar = userAvatarUpload.single("avatar");
  
    uploadUserAvatar(req, res, async (err) => {
      if (err) {
        if (err.message) return res.status(400).send(err.message);
        return res.status(500).send("server error!");
      }
  
      if (!req.file) return res.status(400).send("File not send!");
  
      try {
        // delete old avatar
        if (req.session.user.avatar)
          await fs.unlink(
            path.join(__dirname, "../public", req.session.user.avatar)
          );
  
        const userss = await user.findByIdAndUpdate(
          req.session.user._id,
          {
            avatar: "/images/userAvatars/" + req.file.filename,
          },
          { new: true }
        );
        console.log(req.session.user.avatar);
        req.session.user.avatar = userss.avatar;
  
        // return res.json(user);
        res.redirect("/profile");
      } catch (err) {
        return next(createError(500, "Server Error!"));
      }
    });
  };

