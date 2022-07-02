import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoder = jwt.verify(token, 'secret123');
      req.userId = decoder._id;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'cannot access',
      });
    }
  } else {
    res.status(400).json({
      message: 'cannot access1',
    });
  }
};
