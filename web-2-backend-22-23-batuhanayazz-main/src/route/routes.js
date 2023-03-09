//import required functions from controllers
import {
    addFish,
    getFishes
} from '../controllers/fishController.js';
import {
    signUpClient,
    logInClient,
    getClients,
    getClientByID
} from '../controllers/clientController.js';
import {
    addStock,
    getStocks,
    getStockByID,
    updateStockByID,
    deleteStockByID
} from '../controllers/stockController.js';

//Specific routes for different endpoints 
// such as get, post, delete and put
const allRoutes = (app) => {

    // to get a list of all fishes or post a new fish
    app.route('/fish')
        .get(
            getFishes
        )
        .post(
            addFish
        );
    // signup
    app.route('/register')

        .post(
            signUpClient
        );
    // login
    app.route('/login')

        .post(
            logInClient
        );

    // to get a list of all clients
    app.route('/clients')

        .get(
            getClients
        );
    // to get a client by id
    app.route('/clients/client/:clientID')
        .get(
            getClientByID
        );

    // to get all clients stocks and post stock
    app.route('/clients/stocks')
        .post(
            addStock
        )
        .get(
            getStocks
        );
    // to get 1 client stock
    app.route('/clients/client/:clientID/stock')

        .get(
            getStockByID
        )
        .put(
            updateStockByID
        )
        .delete(
            deleteStockByID
        );
}

//export the allRoutes function so index.js can use it
export default allRoutes;