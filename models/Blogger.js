import  { Schema, model } from "mongoose";

const BloggerSchema = new Schema({
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
        type: [String],
        unique: true,
        validate: {
            validator: value => {
                if (!value.length) return false;

                for (const phone of value) {
                    if (!isMobilePhone(phone, 'ir-IR')) return false;
                }

                return true;
            },
            message: 'provide valid phoneNumber and at least one phoneNumber'
        },
        set: value => {
            const formattedPhoneNumbers = value.map(phone => {
                if (phone.startsWith('0')) return `+98${phone.slice(1)}`;

                return phone;
            });

            return formattedPhoneNumbers;
        }
    },
    roleInCompany: {
        type: String,
        enum: {
            values: ["Blogger", "Admin"],
            message: "invalid role ({VALUE}) : role is eather Blogger or Admin"
        },
        default: "Blogger",
        trim: true
    }
},
    {
        timestamps: {
            createdAt: "registrationDate",
            updatedAt: "updateAt"
        }
    }
);


export const Blogger =  model("Blogger", BloggerSchema)