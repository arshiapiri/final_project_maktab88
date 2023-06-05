const { Schema, model , Types } = require("mongoose");

const ArticlesSchema = new Schema({
	author: {
		type: Types.ObjectId,
		ref: 'Users',
		required: true
	},
      title: {
        type: String,
        required: true,
        minlength: 3,
      },
      thumbnail: {
        type: String,
      },
      content: {
        type: String,
        required: true,
      },
      images: {
        type: [String]
      },
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment", // Referencing the Comment model
        },
      ]
    },
    { timestamps: true }
)

module.exports = model("Articles", ArticlesSchema);