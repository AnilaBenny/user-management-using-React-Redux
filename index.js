import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './backend/config/db.js';
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js';
import userRoute from './backend/routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoute from './backend/routes/adminRoute.js';
import cors from 'cors';

const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

connectDb();

app.use('/api/users', userRoute,adminRoute);

app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(notFound);
// app.use(errorHandler);
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
