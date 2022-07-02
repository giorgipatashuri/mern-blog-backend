import express, { json } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { postCreateValidaiton, registerValidation } from './validations.js';

import checkAuth from './checkAuth.js';

import * as userControler from './controllers/userControler.js';
import * as postControler from './controllers/postControler.js';
mongoose
  .connect(
    'mongodb+srv://reinjeri:reinjeri@cluster0.3tuvt.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});
app.post('/auth/register', registerValidation, userControler.registration);
app.post('/auth/login', userControler.login);
app.get('/auth/me', checkAuth, userControler.Me);

app.post('/posts', checkAuth, postCreateValidaiton, postControler.create);
app.get('/posts', postControler.getAll);
app.get('/posts/:id', postControler.getOne);
app.delete('/posts/:id', checkAuth, postControler.remove);
app.patch('/posts/:id', checkAuth, postControler.update);

app.get('/tags', postControler.getTags);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server ok');
});
