import { User } from "../models/user.model.js";

// registered User

const registerUser = async (req, res) => {
    try {
        //basic validations

        const { username, password, email } = req.body;

        if( !username || !password || !email ) {
            return res.status(404).json({message: "All fields are required"});
        };

        // check if user is already exist or not

        const existing = await User.findOne({ email : email.toLowerCase() });

        if(existing) {
            res.status(404).json({message: "user already exist"});
        }

        // single user
        const user = await User.create(
            {
                username,
                password,
                email: email.toLowerCase(),
                loggedIn: false
            });

            res.status(201).json({ 
                message: "user registered successfully!",
            user: {id: user._id, username: user.username, email: user.email }
        });
    }catch (error) {
        res.status(500).json({ message: "Internal Server Error, try again", error: error.message })
    }
};


// login User

const loginUser = async (req, res) => {
    try {
        // check if user is already exist

        const user = User.findOne((email) : email.toLowerCase());

        if(!user) {
            return res.status(400).json({message: "user not found"});
        }
        
        
    } catch (error) {
        
    }
}

export default  registerUser;