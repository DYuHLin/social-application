const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const comments = require('../Models/comment');

exports.get_comments = asyncHandler(async (req, res, next) => {
    const allComments = await comments.find({reply: req.params.id}).populate('user').exec();

    return res.json(allComments);
});

exports.get_user_comments = asyncHandler(async (req, res, next) => {
    const allComments = await comments.find({user: req.params.id}).populate('user').exec();

    return res.json(allComments);
});

exports.post_comment = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const comment = new comments({
            user: req.body.userId,
            reply: req.params.id,
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
            await comment.save();
        };
    }catch(err){
        console.log(err);
    };
});

exports.update_comment = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return console.log(errors);
        }else{
            await comments.updateOne({_id: req.params.id}, {$set: {
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

exports.delete_comment = asyncHandler(async (req, res, next) => {
    await comments.findByIdAndDelete(req.params.id);
    return res.json('ok');
});

exports.like_comment = asyncHandler(async(req, res, next) => {
    const liked = await comments.findOne({_id: req.params.id, 'likes.user': req.body.userId});
    if(liked){
        await comments.findOneAndUpdate({_id: req.params.id}, {
            $pull: {
                likes: {user: req.body.userId}
            }
        });
        return res.json('deleted');
    } else{
        await comments.updateOne({_id: req.params.id}, {$push: {likes: {user: req.body.userId}}});
        return res.json('liked');
    }
});