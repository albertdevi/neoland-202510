import { logic } from '../../logic/index.js'

export const getPublicArticlesHandler = (req, res, next) => {
    try {
        const { params: { userId } } = req

        logic.getPublicArticles(userId)
            .then(articles => res.json(articles))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}