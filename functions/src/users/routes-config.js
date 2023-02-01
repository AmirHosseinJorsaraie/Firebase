import { create, all, get, patch, remove , signIn} from "./controller.js";
import { isAuthenticated } from './middlewares/authenticated.js';
import { isAuthorized } from './middlewares/authorized.js';

export function routeConfig(app) {
    //create user
    app.post('/signup', create)

    // lists all users
    app.get('/users', [

        all
    ]);

    // signIn user
    app.post('/signin', signIn);

    // get :id user
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        get
    ]);
    // updates :id user
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        patch
    ]);
    // deletes :id user
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        remove
    ]);
}