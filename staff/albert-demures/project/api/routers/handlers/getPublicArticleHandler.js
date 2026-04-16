import { logic } from '../../logic/index.js'

export const getPublicArticleHandler = (req, res, next) => {
    try {
        const { userId, articleId } = req.params

        logic.getPublicArticle(userId, articleId)
            .then(pet => res.json(pet))
            .catch(error => next(error))
    } catch (error) {
        next
    }
}