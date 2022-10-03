const express = require('express')
const router = express.Router()
const multer = require('multer');
const Post=require('../model/Posts')
const {fs,unlink } = require('fs');
const path = require('path');
const Swal = require('sweetalert');
const alertt=require('alert');
const siteViews = require('../routers/visits')
const wish = require('../public/util/store')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  var wishh = wish.wishs()
  console.log(wishh)

router.get('/add',(req, res) => {
    res.render('posts/formAdd')
})

router.get('/',async(req, res) => {
    const posts = await Post.find().lean().sort({date:-1})
    res.render('posts/index',{posts})
})
router.get('/wishlist', async (req, res) => {
    var wishh = wish.wishs().get();
    console.log(wishh)
    const posts = await Post.find().lean().sort({date:-1})
    res.render('posts/wishlist',{posts})
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
});

var upload = multer({ storage: storage });

//add new post
router.post('/', upload.single('image'), async (req, res) => {
    var newPostData={
        title:req.body.title,
        text:req.body.text,
        image:'/img/'+req.file.filename
    }
    await Post.create(newPostData,(err, post) => {
        if (err) {
            console.log(err)
        } else {
            
            res.redirect('/posts')
        }
    });
})

//delete posts
router.delete('/:id', async (req, res) => {
    const post = await Post.findOne({_id:req.params.id}).lean();  
    var file = process.cwd()+'\\public\\';
    unlink(file+post.image , (err) => {
        if (err) throw err;
      });
    await Post.findOneAndRemove({_id:req.params.id});
    res.redirect('/posts')
})

//edit posts
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({_id:req.params.id}).lean();
    res.render('posts/formEdit',{post})
});


router.put('/:id',upload.single('image'),async (req, res) => {
    var newPostData={
        title:req.body.title,
        text:req.body.text,
        image:'../img/'+req.file.filename
    }
    await Post.findOneAndUpdate({_id:req.params.id},newPostData);
    res.redirect('/posts')

});

router.get('/:id', async (req, res) => {
    
    siteViews.siteViewsUp({_id:req.params.id});
    const post = await Post.findOne({_id:req.params.id}).lean();
    res.render('posts/detail',{post})
})


module.exports = router