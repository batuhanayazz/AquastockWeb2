//import mongoose
import mongoose from 'mongoose';
//create a mongoDB schema
const schema = mongoose.Schema;
export const ClientSchema = new schema({
    username: {type: String,required: 'Username is required'},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type: String,required: 'Password is required',/*select: false*/}
});