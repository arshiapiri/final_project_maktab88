const { Schema, model } = require("mongoose");

const ArticlesSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
      title: {
        type: String,
        required: true,
        minlength: 3,
      },
      description: {
        type: String,
        required: false,
        minlength: 3,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      images: {
        type: String,
        required: false,
      },
      author: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
)

module.exports = model("Articles", ArticlesSchema);