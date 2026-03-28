import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, PetData } from '../data/index.js'
import { logic, Pet } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('getPet', () => {

    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeds on get a pet', () => {
        let userData
        let petId

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(ud => {
                userData = ud
                return data.insertPet(new PetData(null, userData.id, 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif'))
                    .then(() => data.findPetsByUserId(userData.id))
            })
            .then(pets => {
                petId = pets[0].id
                return logic.getPet(userData.id, petId)
            })
            .then(pet => {
                expect(pet).to.be.instanceOf(Pet)
                expect(pet.name).to.equal('laboon')
                expect(pet.birthdate.getFullYear()).to.equal(2025)
                expect(pet.birthdate.getMonth()).to.equal(11)
                expect(pet.birthdate.getDate()).to.equal(25)
                expect(pet.ownerId).to.equal(userData.id)
                expect(pet.weight).to.equal(50)
                expect(pet.image).to.equal('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif')
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getPet('012345678901234567890123', '012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing pet', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('layton@gmail.com'))
            .then(userData => logic.getPet(userData.id, '012345678901234567890123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('pet not found')
            })
    })

    it('fails on existing user and existing pet from another user', () => {
        let caught = null

        return Promise.all([
            data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular')),
            data.insertUser(new UserData(null, 'luke triton', 'luke@gmail.com', 'luke', hashed, null, 'regular'))
        ])
            .then(() => data.findUserByEmail('luke@gmail.com'))
            .then(userData2 => {
                return data.insertPet(new PetData(null, userData2.id, 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif'))
                    .then(() => data.findPetsByUserId(userData2.id))
                    .then(petsData => {
                        const [petData] = petsData

                        return data.findUserByEmail('layton@gmail.com')
                            .then(userData => logic.getPet(userData.id, petData.id))
                    })
            })
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('user not owner of pet')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})