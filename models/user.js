const mongoose = require('mongoose');
const bcript = require('bcryptjs')
const userSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
  }
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcript.hash(user.password, 8);
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return await bcript.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);