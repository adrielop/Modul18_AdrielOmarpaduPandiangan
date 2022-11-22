const jwt = require("jsonwebtoken");

const config = process.env;

const Auth = {
  verifyToken(req, res, next) {
    //const token = req.cookies.jwt;
    const {token} = req.body;
    console.log(token)


    if (token) {
      // 12. Lalukan jwt verify
      const decode = jwt.verify(token, config.SECRET);
      req.verified = decode
      return next()
      
    } else {
      res
        .status(403)
        .send({ message: "Youre not authenticated, please login first" });
      console.log("You are not authenticated");
    }
  
  },
};

module.exports = Auth;
