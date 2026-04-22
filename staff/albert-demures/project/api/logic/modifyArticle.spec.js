import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, ArticleData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('modifyArticle', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user and article', () => {
        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))
            .then(userData => {
                return data.insertArticle(new ArticleData(null, userData.id, 'Nueva colección de libros', 'Llegan nuevos libros sobre fauna de los Pirineos', '2026-01-10', 'Nueva coleción de libros llega para todos los públicos', 'https://hablamosdelibros.es/wp-content/uploads/2023/09/TO00256901.jpg', 'paragraph01', 'https://www.libreriadesnivel.com/media/img/portadas/9788415885542.jpg', 'paragraph02', 'https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_.jpg', 'paragraph03', 'https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques.jpg', 'public'))
                    .then(() => data.findArticlesByUserId(userData.id))
                    .then(articlesData => {
                        const [articleData] = articlesData

                        return logic.modifyArticle(userData.id, articleData.id, 'Nueva colección de libros2', 'Llegan nuevos libros sobre fauna de los Pirineos2', '2026-02-10', 'Nueva coleción de libros llega para todos los públicos2', 'https://hablamosdelibros.es/wp-content/uploads/2023/09/TO002569012.jpg', 'paragraph012', 'https://www.libreriadesnivel.com/media/img/portadas/97884158855422.jpg', 'paragraph022', 'https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_2.jpg', 'paragraph032', 'https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques2.jpg', 'draft')
                            .then(() => data.findArticleById(articleData.id))
                    })
                    .then(articleData => {
                        expect(articleData.title).to.equal('Nueva colección de libros2')
                        expect(articleData.subtitle).to.equal('Llegan nuevos libros sobre fauna de los Pirineos2')
                        expect(articleData.date.getFullYear()).to.equal(2026)
                        expect(articleData.date.getMonth()).to.equal(1)
                        expect(articleData.date.getDate()).to.equal(10)
                        expect(articleData.paragraph0).to.equal('Nueva coleción de libros llega para todos los públicos2')
                        expect(articleData.image0).to.equal('https://hablamosdelibros.es/wp-content/uploads/2023/09/TO002569012.jpg')
                        expect(articleData.paragraph1).to.equal('paragraph012')
                        expect(articleData.image1).to.equal('https://www.libreriadesnivel.com/media/img/portadas/97884158855422.jpg')
                        expect(articleData.paragraph2).to.equal('paragraph022')
                        expect(articleData.image2).to.equal('https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_2.jpg')
                        expect(articleData.paragraph3).to.equal('paragraph032')
                        expect(articleData.image3).to.equal('https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques2.jpg')
                        expect(articleData.visibility).to.equal('draft')
                    })
            })

    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.modifyArticle('012345678901234567890123', '012345678901234567890123', 'Nueva colección de libros2', 'Llegan nuevos libros sobre fauna de los Pirineos2', '2026-02-10', 'Nueva coleción de libros llega para todos los públicos2', 'https://hablamosdelibros.es/wp-content/uploads/2023/09/TO002569012.jpg', 'paragraph012', 'https://www.libreriadesnivel.com/media/img/portadas/97884158855422.jpg', 'paragraph022', 'https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_2.jpg', 'paragraph032', 'https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques2.jpg', 'draft')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing article', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))

            .then(userData => logic.modifyArticle(userData.id, '012345678901234567890123', 'Nueva colección de libros2', 'Llegan nuevos libros sobre fauna de los Pirineos2', '2026-02-10', 'Nueva coleción de libros llega para todos los públicos2', 'https://hablamosdelibros.es/wp-content/uploads/2023/09/TO002569012.jpg', 'paragraph012', 'https://www.libreriadesnivel.com/media/img/portadas/97884158855422.jpg', 'paragraph022', 'https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_2.jpg', 'paragraph032', 'https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques2.jpg', 'draft'))

            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('article not found')
            })
    })

    it('fails on existing user and existing article from another user', () => {
        let caught = null

        return Promise.all([
            data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null,)),
            data.insertUser(new UserData(null, 'Biblioteca Abrera2', 'biblioteca@abrera2.com', hashed, null,))
        ])
            .then(() => data.findUserByEmail('biblioteca@abrera2.com'))
            .then(userData2 => {
                return data.insertArticle(new ArticleData(null, userData2.id, 'Nueva colección de libros', 'Llegan nuevos libros sobre fauna de los Pirineos', '2026-01-10', 'Nueva coleción de libros llega para todos los públicos', 'https://hablamosdelibros.es/wp-content/uploads/2023/09/TO00256901.jpg', 'paragraph01', 'https://www.libreriadesnivel.com/media/img/portadas/9788415885542.jpg', 'paragraph02', 'https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_.jpg', 'paragraph03', 'https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques.jpg', 'public'))
                    .then(() => data.findArticlesByUserId(userData2.id))
                    .then(articlesData => {
                        const [articleData] = articlesData

                        return data.findUserByEmail('biblioteca@abrera.com')
                            .then(userData => logic.modifyArticle(userData.id, articleData.id, 'Nueva colección de libros2', 'Llegan nuevos libros sobre fauna de los Pirineos2', '2026-02-10', 'Nueva coleción de libros llega para todos los públicos2', 'https://hablamosdelibros.es/wp-content/uploads/2023/09/TO002569012.jpg', 'paragraph012', 'https://www.libreriadesnivel.com/media/img/portadas/97884158855422.jpg', 'paragraph022', 'https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_2.jpg', 'paragraph032', 'https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques2.jpg', 'draft'))
                    })
            })
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('user not owner of article')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels()
    ]))

    after(() => disconnect())
})
