import mongoose from 'mongoose';
import validator from 'validator';


const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    roles: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        required: true
    },
});

const User = mongoose.model('User', userSchema);
export default User;
