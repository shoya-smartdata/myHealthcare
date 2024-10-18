import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../Models/index.js';

// Signup Route
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });
     res.status(201).json({
        message: "useer register successfully !",
        user
     })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



// Login Route
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid entries.......' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid  entries ' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error ' });
  }
}


