//import mongoose
import mongoose from 'mongoose';
//create a mongoDB schema
const schema = mongoose.Schema;

//export fish schema
export const FishSchema = new schema({
    fish_id:{type: Number,required: 'fish_id  is required'},
    common_name: {type: String,required: 'common_name  is required'},
    scientific_name: {type: String,required: 'scientific_name  is required'},
    species_group: {type: String,required: 'species_group  is required'},
    image_link: {type: String,required: 'image_link  is required'}
});