import mongoose from 'mongoose';

const roleSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String],
        required: true,
    }
});

const Role = mongoose.model('Role', roleSchema);

export default Role;