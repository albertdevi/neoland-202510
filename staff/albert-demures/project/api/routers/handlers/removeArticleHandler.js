import { logic } from '../../logic/index.js'

export const removeArticleHandler = (req, res, next) => {
    try {
        const { userId, params: { articleId } } = req
        
        logic.removeArticle(userId, articleId)
        .then(() => res.status(204).send())
        .catch(error => next (error))
    } catch (error) {
        next(error)
    }
}