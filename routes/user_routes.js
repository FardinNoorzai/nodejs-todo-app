const express = require("express");
const router = express.Router();
const User = require("../models/user");
const generateJwtToken = require("../utils/security_utils");
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({error: 'Invalid login credentials'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({error: 'Invalid login credentials'});
    }
    const token = generateJwtToken(user);
    return res.status(200).json({token});

  }catch(error){
    return res.status(400).json({error: error.message});
  }
});

module.exports = router;
