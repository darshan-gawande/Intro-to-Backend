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
            return res.status(404).json({message: "User already exist"});
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
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if(!user) {
            return res.status(401).json({ message: "user not found" });
        }

        // compare password
        const isMatched = await user.comparePassword(password);
        
        if(!isMatched) {
            return res.status(404).json({message: "Invalid email or password"});
        }

        return res.status(200).json(
            {
            message: "User Logged In successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error: ", error);

        return res.status(500).json({
            message: "Internal Server Error " + error
        });
    }
};

// log-out user
const logoutUser = async ( req, res ) => {
    try {
        const { email } = req.body;

        const user = User.findOne({ email: email.toLowerCase() });

        if(!user) {
            return res.status(401).json({ 
                message: "user not found"
            })
        };

        return res.status(201).json({ 
            message: "logout Successfully"
        });
    } catch (error) {
        return res.status(501).json({ 
            message: "Internal Server Error", error});
    }
}

export  { registerUser, loginUser, logoutUser };