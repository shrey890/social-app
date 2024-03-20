const express= require('express');
const app = express();
const db = require('./models')
const postRouter = require('./routes/posts.js')
const cors = require('cors')
app.use(cors())
app.use(express.json())
// ! router
app.use('/posts',postRouter)
const commentsRouter = require('./routes/comments.js')
app.use('/comments',commentsRouter)
const usersRouter = require('./routes/Users.js')
app.use('/auth',usersRouter)
db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log('listening on http://localhost:3000')
    })
})