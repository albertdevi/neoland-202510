import { logic } from '../../logic/index.js'

export const getReelArticleHandler = (req, res, next) => {
    try {
        const { userId, articleId } = req.params

        logic.getReelArticle(userId, articleId)
            .then(article => res.json(article))
            .catch(error => next(error))
    } catch (error) {
        next
    }
}