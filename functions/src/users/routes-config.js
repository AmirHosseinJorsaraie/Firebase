import { create, all, get, patch, remove } from "./controller.js";
import { isAuthenticated } from './auth/authenticated.js';
import { isAuthorized } from './auth/authorized.js';

export function routeConfig(app) {
    //create user
    app.post('/users', create)

    // lists all users
    app.get('/users', [

        all
    ]);
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