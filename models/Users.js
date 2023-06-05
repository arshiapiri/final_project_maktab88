const  { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")

const UsersSchema = new Schema({
    fristName: {
        type: String,
        required: [true, "fristName is required"],
        minlength: [3, "fristName must be equal or more than 3 characters"],
        maxlength: [30, "fristName must be equal or less than 30 characters"],
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"],
        minlength: [3, "lastName must be equal or more than 3 characters"],
        maxlength: [30, "lastName must be equal or less than 30 characters"],
        trim: true,
        lowercase: true
    },
    username: {
        type:String,
        required:[true, "username is required"],
        minlength: [3, "username must be equal or more than 3 characters"],
        maxlength: [30, "username must be equal or less than 30 characters"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be equal or more than 8 characters"],
        maxlength: [30, "password must be equal or less than 30 characters"],
      },
    gender: {
        type: String,
        enum: {
            values: ["not set", "man", "women"],
            message: "Invalid gender ({VALUE}): gender is eather man or women"
        },
        default: "not set",
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^(\+98|0)?9\d{9}$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid Iranian phone number!`,
        },
        set: function (v) {
          return `+98${v.replace(/^0/, "")}`;
        }
    },
    roleIn: {
        type: String,
        enum: {
            values: ["Blogger", "Admin"],
            message: "invalid role ({VALUE}) : role is eather Blogger or Admin"
        },
        default: "Blogger",
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        default: function () {
          if (this.gender === "man") {
            return "male.png";
          } else {
            return "female.png";
          }
        },
      }
},
    {
        timestamps: {
            createdAt: "registrationDate",
            updatedAt: "updateAt"
        }
    }
);

UsersSchema.virtual("articles", {
  ref: "Articles",
  localField: "_id",
  foreignField: "author",
});

UsersSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "user",
});

UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
  });
  
UsersSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
  };

module.exports =  Users =  model("Blogger", UsersSchema)