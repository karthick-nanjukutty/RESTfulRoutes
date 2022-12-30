const express =require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

let  comments = [
    { id: uuidv4(),
        username: "Todd",
        comment: "lol, that is so funny"
    },
    { id: uuidv4(),
        username: "Hidd",
        comment: "Goodmorning, have a nice day"
    },

    { id: uuidv4(),
        username: "Brick",
        comment: "Hey, How was your breakfast?"
    },

    { id: uuidv4(),
        username: "Sant",
        comment: "please save me"
    },


]

app.get ('/comments', (req,res) =>{

    console.log (comments) 

    res.render ('comments/index', {comments})
})

app.get ('/comments/new', (req,res) =>{
    res.render('comments/new')
});

app.post('/comments' , (req,res) =>{

    console.log (req.body);
    const {username, comment} = req.body;
    comments.push ({username,comment, id: uuidv4()})
    res.redirect('/comments')
   // res.send("it worked")

})

app.get ('/comments/:id' , (req,res) =>{
    const {id} = req.params;
    const comment = comments.find( c => c.id === id );
  console.log (id);
  console.log (comment)
  res.render ('comments/show' , {comment})
    //res.render ('/comments/show', {comment})

})

app.get ('/tacos' , (req,res) =>{
    console.log (req.url)
    console.log (req.query)
    console.log(req.body)
    res.send ("GET /tacos response")
})

app.post ('/tacos', (req,res) =>{
    const {meat,qty} = req.body;
    
    //console.log(req.body)
    res.send (`OK here are your ${qty} ${meat} tacos`)
}
)
app.get ('/comments/:id/edit', (req,res)=>{

    const {id} = req.params;

    const comment = comments.find((c) => c.id === id);
    res.render('comments/edit', { comment})

})


app.patch ('/comments/:id' , (req,res) =>{

    const {comment} = req.body;
   //  console.log (req.params)

   const {id} = req.params;
    //console.log (comment)
    const oldComment = comments.find( c => c.id === id );
    console.log ("old comment is " ,oldComment);
    oldComment.comment = comment; 
    res.redirect ('/comments')

    // take the id 

})

app.delete ('/comments/:id' , (req,res) => {
   const {id} = req.params;
    // find that id
    //const foundComment = comments.find (c => c.id ===id );
   comments = comments.filter(c => c.id !== id); 
  res.redirect ('/comments')
    

})

app.listen(3003,() =>{
    console.log("ON Port 3003")
})