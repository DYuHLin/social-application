const posts = require('../Models/posts');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

exports.get_posts = asyncHandler(async(req, res, next) => {
    const allPosts = await posts.find().populate('user').exec();

    res.json(allPosts);
});

exports.get_single_post = asyncHandler(async(req, res, next) => {
    const posted = await posts.findById(req.params.id).populate('user').exec();

    return res.json(posted);
});

exports.get_user_posts = asyncHandler(async(req, res, next) => {
    const allPosts = await posts.find({user: req.params.id}).populate('user').exec();

    res.json(allPosts);
});

exports.create_post = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const posted = new posts({
            user: req.body.userId,
            text: req.body.text,
            link: req.body.link,
            video: req.body.video,
            date: Date.now(),
            pics: req.body.pics,
            likes: [],
        });

        if(!errors.isEmpty()){
            return console.log(errors);
        }else{
            await posted.save();
        };
    }catch(err){
        console.log(err);
    };
});

exports.update_posts = asyncHandler(async(req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return console.log(errors);
        }else{
            await posts.updateOne({_id: req.params.id}, {$set: {
                user: req.body.userId,
                text: req.body.text,
                link: req.body.link,
                video: req.body.video,
                date: req.body.date,
                pics: req.body.pics,
                likes: req.body.likes,}});
        };
    }catch(err){
        console.log(err);
    };
});

exports.delete_posts = asyncHandler(async(req, res, next) => {
    await posts.findByIdAndDelete(req.params.id);
    return res.json('ok');
});

exports.like_post = asyncHandler(async(req, res, next) => {
    const liked = await posts.findOne({_id: req.params.id, 'likes.user': req.body.userId});
    if(liked){
        await posts.findOneAndUpdate({_id: req.params.id}, {
            $pull: {
                likes: {user: req.body.userId}
            }
        });
        return res.json('deleted');
    } else{
        await posts.updateOne({_id: req.params.id}, {$push: {likes: {user: req.body.userId}}});
        return res.json('liked');
    }
});