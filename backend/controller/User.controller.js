import User from "../models/user.model.js";
import bcrypt from 'bcrypt'; 
import createTokenAndSaveCookie from './../JWT_token/GenerateToken.js'

export const signup = async (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;

    // Log incoming data for debugging
    console.log("Received data:", { fullname, email, password, confirmPassword });

    // Basic input validation
    if (!fullname || !email || !password || !confirmPassword) {
        console.error("Validation error: Missing fields"); // Logging validation error
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            console.error("Password mismatch error");
            return res.status(400).json({ error: "Passwords do not match" });
        }

       

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            console.error("User already exists ");
            return res.status(400).json({ error: "User already exists" });
        }

        

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Log before creating user
        console.log("Creating user...");

        // Create new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword, // Save the hashed password
            
        });

        // Log before saving user
        console.log("Saving user...");

        // Save the user
        await newUser.save();
        if(newUser) {
            createTokenAndSaveCookie(newUser._id,res)
            console.log("User created successfully");
        return res.status(201).json({ message: "User created successfully",
            user:{
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email
        }
         });

        }
    
    } catch (error) {
        console.error("Error occurred during signup:", error); // More detailed logging
        return res.status(500).json({ error: "Internal server error" });
    }
};


// this is for login
export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        const isMatch =await bcrypt.compare(password,user.password)

        if(!user || !isMatch) {
            return res.status(400).json({error:"invalid email or password"})
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({message:"user logged in successfully",
        user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }
    })
    } catch (error) {
     console.log(error)
     return res.status(500).json({ error: "Internal server error" });
    }
}

// for logout functionality

export const logout = async(req,res) => {
    try {
        res.clearCookie("jwt")
        res.status(201).json({message:"user loggout successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
