//import mongoose
import mongoose from 'mongoose';
import {
    FishSchema
} from '../models/fishModel.js';

//create a new collections  in the database
//using the model from our schemas
const Fish = mongoose.model('Fishes', FishSchema);

/**
 *  FISH COLLECTION FUNCTIONS
 */
export const addFish = (req, res) => {
    let newFish = new Fish(req.body);
    Fish.find({
        fish_id: req.body.fish_id
    }, (err, fishID) => {
        if (fishID.length) {
            res.status(401).send({
                status: 'Bad Request',
                message: 'Fish object already in database',
                error: err
            });
        } else {
            newFish.save((err, fish) => {
                if (err) {
                    res.status(401).send({
                        status: 'Bad Request',
                        message: 'Cannot save fish',
                        error: err
                    });
                }
                //else pass the fish information
                res.json(fish);
            });
        }
    });
};

export const getFishes = (req, res) => {
    Fish.find({}, (err, fish) => {
        if (err) {
            res.status(401).send({
                status: 'Bad Request',
                message: 'Cannot get fishes',
                error: err
            });
        }
        //else pass the fishes
        res.status(200).send({
            status: 'Successfully',
            message: 'Successfully getting fish',
            fish
        });
    });
};