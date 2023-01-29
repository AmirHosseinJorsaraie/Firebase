import { create, all, get, patch, remove } from "./controller.js";
import { isAuthenticated } from './auth/authenticated.js';
import { isAuthorized } from './auth/authorized.js';

export function routeConfig(app) {
    //create user
    app.post('/users', isAuthenticated, isAuthorized({ hasRole: ['admin', 'manager'] }), create)

    // lists all users
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
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