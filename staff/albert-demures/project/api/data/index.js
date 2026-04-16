export* from './models/index.js'

import { insertUser } from './insertUser.js'
import { findUserByEmail } from './findUserByEmail.js'
import { findUserByName  } from './findUserByname.js'
import { findUserById } from './findUserById.js'
import { updateUser } from './updateUser.js'
import { deleteAllUsers } from './deleteAllUsers.js'


import { insertArticle } from './insertArticle.js'
import { findArticleById } from './findArticleById.js'
import { findArticlesByUserId } from './findArticlesByUserId.js'
import { deleteAllArticles } from './deleteAllArticles.js'
import { updateArticle } from './updateArticle.js'
import { deleteArticle } from './deleteArticle.js'
import { findPublicArticlesByUserId } from './findPublicArticlesByUserId.js'
import { findPublicArticleById } from './findPublicArticleById.js'


export const data = {
    insertUser,
    findUserByEmail,
    findUserById,
    findUserByName,
    updateUser,
    deleteAllUsers,

    insertArticle,
    findArticleById,
    findArticlesByUserId,
    deleteAllArticles,
    updateArticle,
    deleteArticle,
    findPublicArticlesByUserId,
    findPublicArticleById
}