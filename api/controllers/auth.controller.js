import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body; // eslint-disable-line
    const hashedPassword = bcryptjs.hashSync(password, 10);


    const newUser = new User({ username, email, password : hashedPassword });
    try {
     await newUser.save()
     res.status(201).json('New User added Sucessfully!');

    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.cookie('token', token, { httpOnly: true });
  
      const { username, email: userEmail } = user; 
      res.status(200).json({
        message: 'User logged in successfully',
        user: { username, email: userEmail }
      });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred. Please try again.' });
      next(error);
    } finally {
      console.log('User signed in');
    }
  };

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({
        message: 'User logged in successfully',
        user: rest }) 

    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ username: req.body.username.split(" ").join("").toLowerCase() + Math.random().
        toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photoURL });  
       await newUser.save();
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
        res.cookie('token', token, { httpOnly: true }).status(201).json(rest);
    } 
      

  } catch (error) {
    next(error)
  }


}