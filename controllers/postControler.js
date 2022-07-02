import postModule from '../modules/postModule.js';
import jwt from 'jsonwebtoken';

export const create = async (req, res) => {
  try {
    const doc = new postModule({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'cannot create post',
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await postModule.find().populate('user').exec();
    res.json(posts.reverse());
  } catch (error) {
    console.log(error);
    res.json({
      message: 'cannot create post',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await postModule.findOne({ _id: postId }).populate('user').exec();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'cannot create post123',
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await postModule.findOneAndDelete({ _id: postId });

    res.json({
      message: 'post removed success',
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'cannot remove post',
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await postModule.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );
    res.json({
      message: 'post success updated',
    });
  } catch (error) {
    res.json({
      message: 'cannot update post',
    });
  }
};
export const getTags = async (req, res) => {
  try {
    const posts = await postModule.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'cannot create tag',
    });
  }
};
