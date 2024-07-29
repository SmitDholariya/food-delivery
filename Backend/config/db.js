import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://smitdholariya06:2004@cluster0.pyxs8ya.mongodb.net/fooddelivery').then(()=>console.log("DB connected"));
}