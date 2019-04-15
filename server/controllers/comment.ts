import Post from './../models/post'
import BaseCtrl from './base';

export default class CommentCtrl extends BaseCtrl {
  model = Post;


  addComment = (req, res, next) => {
    this.model.find({ _id: req.params.id }, (err, post) => {
      if (err) { return res.sendStatus(403); }
      if (!post) {
        return res.status(503).send({
          error: 'No post found.'
        });
      }
    });
    let comments = this.model.comments;
    comments.push({
      userId: res.locals.userId,
      userName: res.locals.userName,
      date: Date.now(),
      comment: req.body.comment
    });
    this.model.findOneAndUpdate({ _id: req.params.id }, { comments: comments },
      (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200).send(this.model);
      });
  }
}
