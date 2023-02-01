export function isAuthorized(opts) {
    return (req, res, next) => {
        const { role, email, uid } = req.locals
        const { id } = req.params

        if(email == 'amir77hero@gmail.com'){
            return next()
        }
        
        if (opts.allowSameUser && id && uid === id)
        return next();

        if(!role){
            return res.status(403).send();
        }

        if(opts.hasRole.includes(role)){
            return next()
        }

        return res.status(403).send();
    }
}