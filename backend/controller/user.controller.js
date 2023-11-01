const User = require("../model/user.model");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//  create jwt token
function generateJwtToken(_id) {
    return jwt.sign({ _id }, process.env.JWT_KEY, {
        expiresIn: "10d",
    });
}

// signup controller function
const signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Sanitize input
        name = validator.trim(name);
        email = validator.trim(email);
        password = validator.trim(password);

        // check if all fields are not empty
        if (!name || !email || !password) {
            return res.status(422).json({ error: "Please Fill All The Fields." });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(422).json({ error: "Invalid email address." });
        }

        // check valid password which have minimum 8 characters
        if (password.length < 8) {
            return res.status(422).json({ error: "password must have atleast 8 characters." });
        }

        // Validate input length
        if (name.length > 40 || email.length > 40 || password.length > 40) {
            return res.status(422).json({ error: "Fields can't exceed 40 characters." });
        }

        // check if user already created
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(422).json({ error: "User Already Exist." });
        }

        //  hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  add user info to db
        const isCreated = await User.create({ name, email, password: hashedPassword });

        // if user successfully added to database
        if (isCreated) {

            // data object
            const data = {
                _id: isCreated._id,
                name: isCreated.name,
                email: isCreated.email,
            }

            // send response
            res.status(200).json({ data: data, message: "Account successfully created" });
        }
        else {
            return res.status(422).json({ error: "Login Failed." });
        }

    } catch (error) {
        // handel error
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// login controller function
const logIn = async (req, res) => {

    try {

        let { email, password } = req.body;

        // Sanitize input
        email = validator.trim(email);
        password = validator.trim(password);

        // check if all fields are not empty
        if (!email || !password) {
            return res.status(422).json({ error: "Please Fill All The Fields." });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(422).json({ error: "Invalid email address." });
        }

        // Validate input length
        if (email.length > 40 || password.length > 40) {
            return res.status(422).json({ error: "Fields can't exceed 40 characters." });
        }

        // find user 
        const user = await User.findOne({ email: email });

        // check for correct email and password
        if (user && (await bcrypt.compare(password, user.password))) {

            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateJwtToken(user._id),
            }

            // send response if login success
            res.status(200).json({ data: data, message: "Successfully Login!" })
        }
        else {

            // if login failed
            res.status(422).json({ error: "Incorrect email or password." })
        }

    } catch (error) {
        // handel error
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = { signUp, logIn }