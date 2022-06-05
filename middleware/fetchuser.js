const jwt=require("jsonwebtoken");


const fetchuser=(req,res,next)=>{

    // get the user from token and add the id in the request
    const token=req.header("auth-token");
    if(!token)
    {
        return res.status(401).send({error:"pls authenticate using valid web token"});
    }

    const data = jwt.verify(token,"lakshyaisagoodboy@l");
    req.user=data.user;
    next();

}





module.exports=fetchuser;