const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authUserMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            // get jwt token
            token = req.headers.authorization.split(" ")[1];
            

            // get payload from token
            const payload = jwt.verify(token, process.env.JWT_KEY);
            const { _id } = payload;
          
            // find user
            req.user = await User.findById(_id);

            // continue
            next();

        } catch (error) {

            // handel error
            res.status(401).json({ error: "You must be logged in." });
        }
    } else {

        // if JWT not present
        res.status(401).json({ error: "You must be logged in." });
    }
};


module.exports = {authUserMiddleware};