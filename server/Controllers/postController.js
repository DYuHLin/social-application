const posts = require('../Models/posts');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

exports.create_post = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const posted = new posts({
            user: req.body.userId,
            text: req.body.text,
            link: req.body.link,
            video: req.body.video,
            pics: req.body.pics,
            likes: req.body.likes,
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

