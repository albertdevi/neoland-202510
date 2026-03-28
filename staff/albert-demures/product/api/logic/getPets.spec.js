import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, PetData } from '../data/index.js'
import { logic, Pet } from './index.js'
import { ExistenceError } from 'com'

describe('getPets', () => {

    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))


    it('succeds on getting all the pets form the user', () => {
        let userData

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(ud => {
                userData = ud
                return data.insertPet(new PetData(null, userData.id, 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif'))
            })
            .then(() => logic.getPets(userData.id))
            .then(pets => {
                expect(pets).to.have.lengthOf(1)
                const petData = pets[0]
                expect(petData).to.exist
                expect(petData.name).to.equal('laboon')
                expect(petData.ownerId).to.equal(userData.id)
            })
    })

    it('fails on find a non existing user', () => {
        let caught = null
        return logic.getPets('69bdb0bf6423ec14804cb67c')
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