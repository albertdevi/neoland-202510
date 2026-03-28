import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { DuplicityError } from 'com'

describe('registerUser', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on a new user', () => {
        return logic.registerUser('hershel layton', 'layton@gmail.com', 'layton', '123123123', '123123123')
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => {
                expect(userData).to.exist
                expect(userData.name).to.equal('hershel layton')
                expect(userData.email).to.equal('layton@gmail.com')
                expect(userData.username).to.equal('layton')

                return bcrypt.compare('123123123', userData.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing user with same email', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton2', hashed, null, 'regular'))
            .then(() => logic.registerUser('hershel layton', 'layton@gmail.com', 'layton', '123123123', '123123123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(DuplicityError)
                expect(caught.message).to.equal('user email already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'hershel layton', 'hershell2@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => logic.registerUser('hershel layton', 'layton@gmail.com', 'layton', '123123123', '123123123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(DuplicityError)
                expect(caught.message).to.equal('user username already exists')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})