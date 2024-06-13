import express from 'express';
import { authUser,registerUser,logout ,updateUSerProfile,getUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../../multer.js';
const userRoute = express.Router();

userRoute.post('/auth', authUser);
userRoute.post('/register',registerUser)
userRoute .route('/profile')
.get( getUserProfile)
.put( upload.single('image'),updateUSerProfile);
userRoute.post('/logout',logout)


export default userRoute;
