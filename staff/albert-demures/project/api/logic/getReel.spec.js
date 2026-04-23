import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, ArticleData, ReelData } from '../data/index.js'
import { logic, Reel } from './index.js'
import { ExistenceError} from 'com'


describe('getReel', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user and reel', () => {
        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))
            .then(userData => {
                return data.insertReel(new ReelData(null, userData.id, 'red', 'orange'))
                    .then(() => logic.getReel(userData.id))
            })
            .then(reel => {
                expect(reel).to.be.instanceOf(Reel)
                expect(reel.textColor).to.equal('red')
                expect(reel.backgroundColor).to.equal('orange')
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getReel('012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing reel', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))
            .then(userData => logic.getReel(userData.id))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('reel not found')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels()
    ]))

    after(() => disconnect())
})
