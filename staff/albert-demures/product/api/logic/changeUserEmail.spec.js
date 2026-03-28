import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('changeUserEmail', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on exiting user', () => {
        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => logic.changeUserEmail(userData.id, 'layton@gmail.com', 'layton2@gmail.com', 'layton2@gmail.com'))
            .then(() => data.findUserByEmail('layton2@gmail.com'))
            .then(userData => {
                expect(userData).to.exist
                expect(userData.name).to.equal('hershel layton')
                expect(userData.email).to.equal('layton2@gmail.com')
                expect(userData.username).to.equal('layton')
                expect(userData.image).to.be.null
                expect(userData.role).to.equal('regular')

                return bcrypt.compare('123123123', userData.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.changeUserEmail('69bdb0af6273ac63804cb67c', 'layton@gmail.com', 'layton2@gmail.com', 'layton2@gmail.com')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on changing email on not belonging user', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => logic.changeUserEmail(userData.id, 'layton3@gmail.com', 'luke@gmail.com', 'luke@gmail.com'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('email does not belong to user')
            })
    })

    it('fails on changing user new email belongs to another user', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))

            .then(() => data.insertUser(new UserData(null, 'luke tryton', 'luke@gmail.com', 'luke', hashed, null, 'regular')))

            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => logic.changeUserEmail(userData.id, 'layton@gmail.com', 'luke@gmail.com', 'luke@gmail.com'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('newEmail belongs to another user')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})