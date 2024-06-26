const express= require('express');
const app = express();
const db = require('./models')
const postRouter = require('./routes/posts.js')
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())
// ! router
app.use('/posts',postRouter)
const commentsRouter = require('./routes/comments.js')
app.use('/comments',commentsRouter)
const usersRouter = require('./routes/Users.js')
app.use('/auth',usersRouter)
const likesRouter = require('./routes/Likes.js')
app.use('/like',likesRouter)
db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log('listening on http://localhost:3000')
    })
})