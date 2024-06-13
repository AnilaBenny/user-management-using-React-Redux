import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('hi');
      const user = await userModel.findOne({ email });
      
      
      if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id);
  
      
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
        console.log(error.message);
        res.status(401);
        throw new Error('Invalid email or password');
    }
  }
  
  const registerUser = async (req, res) => {
    try{
    const { name, email, password } = req.body;
  
    const userExists = await userModel.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await userModel.create({
      name,
      email,
      password,
      is_admin:false
    });

    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } 
}catch(error){
      res.status(400);
      throw new Error('Invalid user data');
    }
  };

  const logout = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

  const getUserProfile =async (req, res) => {
    try{
    const user = await userModel.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } }catch(error) {
      res.status(404);
      throw new Error('User not found');
    }
  };

  const updateUSerProfile = async (req, res) => {
    try {
      
      const { _id, name, email} = req.body;
      
     
      const user = await userModel.findById(req.body._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.file) {
        const { filename } = req.file;
        user.image = filename;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        image: updatedUser.image,
        email:updatedUser.email
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  


    export{
        authUser,
        registerUser,
        logout,
        updateUSerProfile,
        getUserProfile
    }