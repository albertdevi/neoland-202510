
export * from './models/index.js'

import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUser } from './getUser.js'

import { addArticle } from './addArticle.js'
import { getArticle } from './getArticle.js'
import { getArticles } from './getArticles.js'
import { removeArticle } from './removeArticle.js'
import { modifyArticle } from './modifyArticle.js'

export const logic = {

    registerUser,
    authenticateUser,
    getUser,

    addArticle,
    getArticle,
    getArticles,
    removeArticle,
    modifyArticle
}