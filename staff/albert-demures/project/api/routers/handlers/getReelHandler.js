import { logic } from '../../logic/index.js'

export const getReelHandler = (req, res, next) => {
    try {
        const { userId } = req.params

        logic.getReel( userId )
        .then(reel => res.json(reel))
        .catch(reel => next(reel))
    } catch (reel) {
        next
    }
}