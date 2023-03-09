//import mongoose
import mongoose from 'mongoose';
import {
    ClientSchema
} from '../models/clientModel.js';

//create a new collection in the database
//using the model from our schemas
const Client = mongoose.model('Client', ClientSchema);

/**
 *  CLIENT COLLECTION FUNCTIONS
 */
export const logInClient = (req, res) => {
    Client.findOne({
        email: req.body.email,
        //password: req.body.password
    }, (err, client) => {
        if (!client) {
            res.status(401).send({
                status:'Bad Request',
                message: 'Your mail is not correct!',
                error: err
            });
        }else if(req.body.password !== client.password){
            res.status(401).send({
                status:'Bad Request',
                message: 'Your password is not correct!',
                error: err
            });
        } else {
            res.status(200).send({
                status:'Login Successfully',
                message: 'You are logged in',
                data: {
                    client_id: client._id,
                    username: client.username,
                    email: client.email
                }
            });
        }
    });
}

export const signUpClient = (req, res) => {
    let newClient = new Client(req.body);
    Client.find({
        email: req.body.email
    }, (err, email) => {
        if (email.length) {
            res.status(401).send({
                status:'Bad Request',
                message: 'Email Already exist! Please use another mail.',
                error: err
            });
        } else {
            newClient.save((err, client) => {
                //send error message if a required field is missing
                if (err) {
                    res.status(401).send({
                        status:'Bad Request',
                        message: 'Fill all required fields.',
                        error: err
                    });
                    return
                }
                //else pass the client information as a json object
                res.send(client);
            });
        }
    });
};

export const getClients = (req, res) => {
    Client.find({}, (err, client) => {
        if (err) {
            //res.send(err);
            res.status(401).send({
                status:'Bad Request',
                message: 'Cannot find Clients',
                error: err
            });
        }
        //else pass the clients
        //res.json(client);
        res.status(200).send({
            status:'Successfully',
            message: 'Successfully getting clients',
            client
        });
    });

};

export const getClientByID = (req, res) => {
    //find a specific client by ID
    Client.findById(req.params.clientID, (err, client) => {
        if (err) {
            res.status(401).send({
                status:'Bad Request',
                message: 'Can not find client id.',
                error: err
            });
            
        }
        //else pass the fish
        res.status(200).send({
            status:'Successfully',
            message: 'Successfully getting with client id.',
            client
        });
    });

}