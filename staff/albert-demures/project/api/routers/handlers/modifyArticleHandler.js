import { logic } from '../../logic/index.js'

export const modifyArticleHandler = (req, res, next) => {
    try {
        const { userId, params: { articleId }, body: { title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility }
    } = req

    logic.modifyArticle(userId, articleId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)
        .then(() => res.status(204).send())
        .catch(error => next(error))
} catch (error) {
    next(error)
}
}