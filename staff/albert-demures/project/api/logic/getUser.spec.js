import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic, User } from './index.js'
import { ExistenceError } from 'com'

describe('getUser', () => {

    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user', () => {
        return data.insertUser(new UserData( null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
        .then(() => data.findUserByEmail('biblioteca@abrera.com'))
        .then(userData => logic.getUser(userData.id))
        .then(user => {
            expect(user).to.be.instanceOf(User)
            expect(user.name).to.equal('Biblioteca Abrera')
            expect(user.email).to.equal('biblioteca@abrera.com')
            expect(user.image).to.be.null
        })
    })

    it('fails on non existing user', () => {
        let caught = null

        return logic.getUser('012345678901234567890123')
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