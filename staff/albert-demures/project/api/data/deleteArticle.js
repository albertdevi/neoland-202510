import { SystemError } from 'com'
import { ArticleModel } from '../mongoose/index.js'

export function deleteArticle(articleId) {
    return ArticleModel.deleteOne({ _id: articleId})
    .catch(error => { throw new SystemError(error.message) })
    .then(result => { })
}