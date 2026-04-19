import { logic } from '../../logic/index.js'

export const modifyReelHandler = (req, res, next) => {
    try {
        const {  params: { userId }, body: { textColor, backgroundColor }
        } = req

        logic.modifyReel(userId, textColor, backgroundColor)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
