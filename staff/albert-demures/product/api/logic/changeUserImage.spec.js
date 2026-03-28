import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('changeUserImage', () => {
     before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))
    
    it('succeds on change user image', () => {
        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => logic.changeUserImage(userData.id, 'https://i.pinimg.com/originals/73/f7/a3/73f7a34cc9f18e7197b981c0686a7e28.gif'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => {
                expect(userData).to.exist
                expect(userData.name).to.equal('hershel layton')
                expect(userData.email).to.equal('layton@gmail.com')
                expect(userData.username).to.equal('layton')
                expect(userData.image).to.equal('https://i.pinimg.com/originals/73/f7/a3/73f7a34cc9f18e7197b981c0686a7e28.gif')
                expect(userData.role).to.equal('regular')

                return bcrypt.compare('123123123', userData.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on find a non existing user', () => {
        let caught = null

        return logic.changeUserImage('012345678901234567890123', 'https://i.pinimg.com/originals/73/f7/a3/73f7a34cc9f18e7197b981c0686a7e28.gif')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })
    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})