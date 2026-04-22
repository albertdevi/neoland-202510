import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, ArticleData } from '../data/index.js'
import { logic, Article } from './index.js'
import { ExistenceError } from 'com'

describe('getArticles', () => {
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
                    .then(() => logic.getArticles(userData.id))
                    .then(articles => {
                        expect(articles).to.have.lengthOf(1)

                        const [article] = articles
                        expect(article).to.be.instanceOf(Article)
                        expect(article.title).to.equal('Nueva colección de libros')
                        expect(article.subtitle).to.equal('Llegan nuevos libros sobre fauna de los Pirineos')
                        expect(article.date.getFullYear()).to.equal(2026)
                        expect(article.date.getMonth()).to.equal(0)
                        expect(article.date.getDate()).to.equal(10)
                        expect(article.paragraph0).to.equal('Nueva coleción de libros llega para todos los públicos')
                        expect(article.image0).to.equal('https://hablamosdelibros.es/wp-content/uploads/2023/09/TO00256901.jpg')
                        expect(article.paragraph1).to.equal('paragraph01')
                        expect(article.image1).to.equal('https://www.libreriadesnivel.com/media/img/portadas/9788415885542.jpg')
                        expect(article.paragraph2).to.equal('paragraph02')
                        expect(article.image2).to.equal('https://m.media-amazon.com/images/I/61cYe0VwJrL._AC_UF1000,1000_QL80_.jpg')
                        expect(article.paragraph3).to.equal('paragraph03')
                        expect(article.image3).to.equal('https://libreriaprames.com/3520-home_default/bosnerau-del-pirineo-el-guardian-de-los-bosques.jpg')
                        expect(article.visibility).to.equal('public')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getArticles('012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels()
    ]))

    after(() => disconnect())
})