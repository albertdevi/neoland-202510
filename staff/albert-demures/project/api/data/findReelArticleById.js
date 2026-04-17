import { SystemError } from "com";
import { ArticleModel } from '../mongoose/index.js'
import { ArticleData } from './models/index.js'

export function findReelArticleById(articleId) {
        return ArticleModel.findOne({ _id: articleId, visibility: 'public' })
        .catch(error => { throw new SystemError(error.message) })
        .then(articleModel => {
            if (!articleModel) return null

            const { id, owner, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility } = articleModel

            return new ArticleData (id, owner.toString(), title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)

        })
}