const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // email là duy nhất
    createdAt: { type: Date, default: Date.now }, // Thêm timestamp
});

// Export model người dùng
module.exports = mongoose.model('User', UserSchema);
