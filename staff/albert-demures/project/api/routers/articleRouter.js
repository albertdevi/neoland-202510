import { Router } from 'express'

import { authMiddleware } from '../middelwares/index.js'

import {
    addArticleHandler,
    getArticlesHandler,
    getArticleHandler,
    removeArticleHandler,
    modifyArticleHandler,
    getPublicArticlesHandler

} from './handlers/index.js'

export const articleRouter = new Router()


articleRouter.post('', authMiddleware, addArticleHandler)
articleRouter.get('', authMiddleware, getArticlesHandler)
articleRouter.get('/:articleId', authMiddleware, getArticleHandler)
articleRouter.delete('/:articleId', authMiddleware, removeArticleHandler)
articleRouter.put('/:articleId', authMiddleware, modifyArticleHandler)
articleRouter.get('/reels/:userId', getPublicArticlesHandler)


