import { Request, Response, NextFunction } from 'express';
import { Post } from '../types';
import fetch from 'node-fetch';

// getting all posts using fetch and parsing them into an array of Post objects
const getPosts = async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post = await result.json();
    return res.status(200).json(posts);
};

export default{getPosts};