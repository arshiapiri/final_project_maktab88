const { Schema, model , Types } = require("mongoose");


const commentSchema = new Schema({
	author: {
		type: Types.ObjectId,
		ref: 'Users',
		required: true
	},
    article: {
        type: Schema.Types.ObjectId,
        ref: "Articles",
        required: true,
      },
      commentForArticle: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
      }
    },
    { timestamps: true }
)

module.exports = model("Comment", commentSchema);