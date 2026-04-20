import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { DuplicityError } from 'com'

describe('RegisterUser', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))


    it('succeeds on a new user', () => {
        return logic.registerUser('Biblioteca Abrera', 'biblioteca@abrera.com', '123123123', '123123123')
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))
            .then(userData => {
                expect(userData).to.exist
                expect(userData.name).to.equal('Biblioteca Abrera')
                expect(userData.email).to.equal('biblioteca@abrera.com')

                return bcrypt.compare('123123123', userData.password)
            })
            .then(match => expect(match).to.be.true)
    })


    it('fails on existing user with same email', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Biblioteca Abrera2', 'biblioteca@abrera.com', hashed, null,))
            .then(() => logic.registerUser('Biblioteca Abrera', 'biblioteca@abrera.com', '123123123', '123123123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(DuplicityError)
                expect(caught.message).to.equal('user email already exists')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels()
    ]))

    after(() => disconnect())
})