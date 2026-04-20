import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, CredentialError } from 'com'

describe('authenticateUser', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user', () => {
        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => logic.authenticateUser('biblioteca@abrera.com', '123123123'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.authenticateUser('biblioteca@abrera2.com', '123123123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but wrong password', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => logic.authenticateUser('biblioteca@abrera.com', '123123123_'))
            .catch(error => caught = error)
            .finally(() => {
            expect(caught).to.be.instanceOf(CredentialError)
            expect(caught.message).to.equal('incorrect password')
        })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels()
    ]))

    after(() => disconnect())
})