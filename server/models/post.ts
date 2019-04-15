import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    // required: true,    
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  comments: [{
    userId: {
      type: mongoose.Types.ObjectId,
      // required: true
    },
    userName: {
      type: String,
      // required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    comment: {
      type: String,
      // required: true
    }
  }]
});

const Post = mongoose.model('Post', postSchema);

export default Post;

 