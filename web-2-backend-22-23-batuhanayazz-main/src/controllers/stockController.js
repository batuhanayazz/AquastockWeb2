//import mongoose
import mongoose from 'mongoose';
import {
    StockSchema
} from '../models/stockModel.js';
//create a new collections  in the database
//using the model from our schemas
const Stock = mongoose.model('Stock', StockSchema);

/**
 *  STOCK COLLECTION FUNCTIONS
 */
export const addStock = (req, res) => {
    let newStock = new Stock(req.body);
    Stock.find({
        client_id: req.body.client_id,
        fish_id: req.body.fish_id
    }, (err, clientID) => {
        if (clientID.length) {
            res.status(401).send({
                status: 'Bad Request',
                message: 'Already in your stock',
                error: err
            });
        } else {
            newStock.save((err, stock) => {
                if (err) {
                    res.status(401).send({
                        status: 'Bad Request',
                        message: 'Cannot add your stock',
                        error: err
                    });
                }
                //else pass the stock information as a json object
                res.status(200).send({
                    status: 'Successfully',
                    message: 'Successfully added your stock',
                    stock
                });
            });
        }
    });
}

export const getStocks = (req, res) => {
    Stock.find({}, (err, stock) => {
        if (err) {
            res.status(401).send({
                status: 'Bad Request',
                message: 'Cannot get your stocks',
                error: err
            });
        }
        //else pass the stock
        res.status(200).send({
            status: 'Successfully',
            message: 'Successfully getting stocks',
            stock
        });
    });

};

export const getStockByID = (req, res) => {
    //find a specific stock by ID
    Stock.find({
        client_id: req.params.clientID
    }, (err, stock) => {
        if (err) {
            res.status(401).send({
                status: 'Bad Request',
                message: 'Can not find stock with id.',
                error: err

            });
        }
        //else pass the stock
        res.status(200).send({
            status: 'Successfully',
            message: 'Successfully getting your stocks',
            stock
        });
    });

}

export const updateStockByID = (req, res) => {
    //find a specific fish by ID and update
    Stock.findOneAndUpdate({
            client_id: req.params.clientID,
            fish_id: req.body.fish_id
        },
        req.body,
        //tell mongoDB to return the new updated object
        {
            new: true
        },
        (err, stock) => {
            //send error message if fish can not be updated
            if (err) {
                res.status(401).send({
                    status: 'Bad Request',
                    message: 'Can not update fish quantity',
                    error: err
                });
            }
            //else pass the fish
            res.status(200).send({
                status: 'Successfully',
                message: 'Successfully updated your fish',
                stock
            });
        });

}

export const deleteStockByID = (req, res) => {
    Stock.findOneAndRemove({
            client_id: req.params.clientID,
            fish_id: req.body.fish_id
        },
        req.body,
        (err, stock) => {
            //send error message if fish can't be deleted
            if (err) {
                res.status(401).send({
                    status: 'Bad Request',
                    message: 'Cannot delete fish from stock',
                    error: err
                });
            }
            res.status(200).send({
                status: 'Successfully',
                message: 'Fish successfully was deleted from your stock.',
                stock
            });
        });

}