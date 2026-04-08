import { logic } from '../../logic/index.js'

export const addArticleHandler = (req, res, next) => {
    try {
        const { userId, body: { title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility } } = req

        logic.addArticle(userId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}