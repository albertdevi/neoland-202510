import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('addPet', () => {

    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeds on existing user', () => {
        let userData

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(ud => {
                userData = ud
                return logic.addPet(userData.id, 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif')
            })
            .then(() => data.findPetsByUserId(userData.id))
            .then(pets => {
                expect(pets).to.have.lengthOf(1)

                const petData = pets[0]
                expect(petData).to.exist
                expect(petData.name).to.equal('laboon')
                expect(petData.birthdate.getFullYear()).to.equal(2025)
                expect(petData.birthdate.getMonth()).to.equal(11)
                expect(petData.birthdate.getDate()).to.equal(25)
                expect(petData.ownerId).to.equal(userData.id)
                expect(petData.weight).to.equal(50)
                expect(petData.image).to.equal('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif')
            })
    })

    it('fails on find a non existing user', () => {
        let caught = null

        return logic.addPet('012345678901234567890123', 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif')
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