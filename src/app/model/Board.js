const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

// Định nghĩa schema cho người dùng
const Board = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String},
    slug: {type: String, slug: 'name', unique: true}
  }, { timestamps: true, collection: 'Boards' });  // Chỉ định tên collection

// Tạo model từ schema
// const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('Board', Board);