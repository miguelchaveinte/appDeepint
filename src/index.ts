import express from 'express'
import posts from './routes/posts_routes';

const app= express()
app.use(express.json()) // for parsing application/json

const PORT=3000

// use the routes provided by the posts module
app.use('/posts', posts);

app.get('/',(_,res)=>{
    res.send('Probando typescript y fetch')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

