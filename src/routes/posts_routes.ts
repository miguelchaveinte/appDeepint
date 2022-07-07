import express from 'express';
import controller from '../controllers/post';
const router = express.Router();

// GET /posts 
// Use the controller to get the posts from the server
router.get('/', controller.getPosts);

export=router;