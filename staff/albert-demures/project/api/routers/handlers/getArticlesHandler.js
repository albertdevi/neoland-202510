import { logic } from '../../logic/index.js'

export const getArticlesHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getArticles(userId)
            .then(articles => res.json(articles))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}