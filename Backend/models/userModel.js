import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Specifies that the name field is required
    },
    email: {
        type: String,
        required: true, // Specifies that the email field is required
        unique: true // Specifies that the
     },
    password: {
        type: String,
        required: true // Specifies that the password field is required
    },
    cartData:{
        Type:Object,
        default:{}
    }
    
},{minimize:false});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
export default User;
