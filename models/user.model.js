const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
    {
        full_name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        email: {
            type: String,
            required: [true, 'Email field is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password field is required'],
        },
        role: {
            type: Boolean,
            required: false
        }
    },
    { timestamps: true }
);

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

module.exports = model('User', userSchema);