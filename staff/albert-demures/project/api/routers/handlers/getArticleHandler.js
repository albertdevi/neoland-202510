import { logic } from '../../logic/index.js'

export const getArticleHandler = (req, res, next) => {
    try {
        const { userId, params: { articleId } } = req

        logic.getArticle(userId, articleId)
            .then(pet => res.json(pet))
            .catch(error => next(error))
    } catch (error) {
        next
    }
}