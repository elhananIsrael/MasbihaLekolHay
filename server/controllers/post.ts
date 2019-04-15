import Post from './../models/post'
import BaseCtrl from './base';

export default class PostCtrl extends BaseCtrl {
  model = Post;


  getAllPostsByUserId = (req, res, next) => {
    this.model.find({ userId: req.locals.userId }, (err, posts) => {
      if (err) { return res.sendStatus(403); }

      res.status(200).send(posts);
    });
  }
}
