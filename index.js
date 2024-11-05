const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import model người dùng
const User = require('./UserModel');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // Middleware để xử lý JSON request

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Route để kiểm tra API
app.get('/', (req, res) => {
    res.send('API is running');
});

// Route để tạo người dùng
app.post('/users', async (req, res) => {
    const { name, email } = req.body; // Lấy thông tin từ request body

    // Kiểm tra xem tên và email có được cung cấp không
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required' });
    }

    try {
        const user = new User(req.body); // Tạo một instance mới của model người dùng
        await user.save(); // Lưu người dùng vào MongoDB
        res.status(201).send(user); // Gửi phản hồi thành công với thông tin người dùng đã tạo
    } catch (err) {
        // Kiểm tra lỗi cụ thể để gửi phản hồi phù hợp
        if (err.code === 11000) {
            return res.status(400).send({ message: 'Email already exists' });
        }
        res.status(500).send(err); // Gửi phản hồi lỗi server
    }
});

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
