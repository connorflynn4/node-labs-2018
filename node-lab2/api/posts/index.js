import express from 'express';
import stubAPI from './stubAPI';

const router = express.Router();

// get all posts
router.get('/', (req, res) => {
  const posts = stubAPI.getAll();
  res.send({posts: posts});
});


// Add a post
router.post('/', (req, res) => {
    const newPost = req.body;

    if (newPost && stubAPI.add(newPost.title, newPost.link)) {
         return res.status(201).send({message: 'Posts Created'});
    }
    return res.status(400).send({message: 'Unable to find Post in request.'});
});

// get a post
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = stubAPI.getPost(id);

       if (post) {
               return res.status(200).send(post);
              }
              return res.status(404).send({message: `Unable to find Post ${id}`});
});


// upvote a post
router.post('/:id/upvote', (req, res) => {
     const id = req.params.id;
            if (stubAPI.upvote(id)) {
                 return res.status(200).send({message: `Post ${id} Upvoted`});
            }
            return res.status(404).send({message: `Unable to find Post ${id}`});
});





// adding a comment
router.post('/:id/comment', (req, res) => {
     const id= req.params.id;
     const newComment = req.body;

            if (newComment && stubAPI.addComment(id,newComment.comment, newComment.author)) {

                 return res.status(200).send({message: `Post ${id} Commented`});
            }
            return res.status(404).send({message: `Unable to post comment ${id}`});
});
export default router;