import admin from "firebase-admin";


//db connection


export async function create(req, res) {
    try {
        const { displayName, password, email, role, lastName } = req.body

        if (!displayName, !password, !email, !role) {
            return res.status(400).send({ message: 'Mising Fields.' })
        }

        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email
        })

        await admin.auth().setCustomUserClaims(uid, { role })
        return res.status(201).send({ uid })
    }
    catch (err) {
        return handleError(res, err)
    }
}

export async function all(req, res) {
    try {
        const db = admin.firestore()

        //get collection ref
        db.collection('User')
            .get()
            .then((snapshot) => {
                let users = []
                snapshot.docs.forEach((data) => {
                    users.push({ ...data.data() , id: data.id })
                })
                console.log(users)
            })


        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(mapUser)
        return res.status(200).send({ users })
    }
    catch (err) {
        return handleError(res, err)
    }
}


function mapUser(user) {
    const customClaims = user.customClaims || { role: '' }
    const role = customClaims.role
    console.log(user.metadata)
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        lastName: user.lastName,
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }
}

export async function get(req, res) {
    try {
        const { id } = req.params
        const user = await admin.auth().getUser(id)
        return res.status(200).send({ user: mapUser(user) })
    }
    catch (err) {
        return handleError(res, err)
    }
}

export async function patch(req, res) {
    try {
        const { id } = req.params
        const { displayName, email, password, role } = req.body

        if (!id || !displayName || !email || !password || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        await admin.auth().updateUser(id, { displayName, password, email })
        await admin.auth().setCustomUserClaims(id, { role })
        const user = await admin.auth().getUser(id)

        return res.status(200).send({ user: mapUser(user) })
    }
    catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params
        await admin.auth().deleteUser(id)
        return res.status(204).send({})
    }
    catch (err) {
        return handleError(res, err)
    }
}

function handleError(res, err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` })
}