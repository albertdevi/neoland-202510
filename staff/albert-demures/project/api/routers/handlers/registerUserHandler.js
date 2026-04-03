import { logic } from '../../logic/index.js'

export const registerUserHandler = (req, res, next) => {
    try {
        const { name, email, password, passwordRepeat } = req.body

    logic.registerUser(name, email, password, passwordRepeat)
        .then(() => res.status(201).send())
        .catch(error => next(error))
} catch (error) {
    next(error)
}
}