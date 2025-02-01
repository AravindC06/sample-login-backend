const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    refreshToken:{
        type: Array,
    }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (err) {
        return next(err);
      }
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);