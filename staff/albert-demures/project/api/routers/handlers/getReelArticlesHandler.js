import { logic } from '../../logic/index.js'

export const getReelArticlesHandler = (req, res, next) => {
    try {
        const { params: { userId } } = req

        logic.getReelArticles(userId)
            .then(articles => res.json(articles))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}