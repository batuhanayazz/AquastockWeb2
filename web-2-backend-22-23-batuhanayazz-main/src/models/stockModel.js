//import mongoose
import mongoose from 'mongoose';
//create a mongoDB schema
const schema = mongoose.Schema;

// stock schema
export const StockSchema = new schema({
    client_id:{type: String,required: 'client_id is required'},
    fish_id:{type: Number,required: 'fish_id is required'},
    quantity: {type: Number,required: 'quantity is required'},
}
);