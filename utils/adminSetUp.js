const Users = require("../models/Users");
const bcrypt = require("bcrypt")

module.exports.CreateAdmin = async () => {
    try {
        const adminUser = await Users.findOne({ role: "admin" });

        if (!adminUser) {

            const newAdminUser = new Users({
                fristName: "Admin",
                lastName: "Admin",
                username: "Admin1",
                password: "Admin123",
                phoneNumber: "09350000000",
                role: "admin",
            })


            const salt = await bcrypt.genSalt(10);
            newAdminUser.password = await bcrypt.hash(newAdminUser.password, salt);
      
            await newAdminUser.save();
            console.log("Admin created successfully!");
        }
        } catch (error) {

        }
    }
