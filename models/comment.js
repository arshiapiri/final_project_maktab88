const { Schema, model , Types } = require("mongoose");
import mongoose from "mongoose";


const commentSchema = new Schema({
	author: {
		type: Types.ObjectId,
		ref: 'Users',
		required: true
	},
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles",
        required: true,
      },
    content: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
      }
    },
    { timestamps: true }
)

module.exports = model("Comment", commentSchema);