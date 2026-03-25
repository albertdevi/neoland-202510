import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { database } from './models.js'

import { logic, User, Pet } from './logic.js'
import { data, UserData, PetData } from './data.js'
import { CredentialError, DuplicityError, ExistenceError, OwnershipError } from 'com'

describe('logic', () => {
    before(() => database.connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    describe('registerUser', () => {
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
    })

    describe('authenticateUser', () => {
        it('succeeds on existing user', () => {
            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => logic.authenticateUser('layton', '123123123'))
                .then(userId => {
                    expect(userId).to.be.a.string
                    expect(userId).to.have.lengthOf(24)
                })
        })

        it('fails on non-existing user', () => {
            let caught = null

            return logic.authenticateUser('layton', '123123123')
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(ExistenceError)
                    expect(caught.message).to.equal('user not found')
                })
        })

        it('fails on existing user but wrong password', () => {
            let caught = null

            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => logic.authenticateUser('layton', '123123123_'))
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(CredentialError)
                    expect(caught.message).to.equal('incorrect password')
                })
        })
    })

    describe('changeUserEmail', () => {
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

    })

    describe('changeUserPassword', () => {
        it('succeeds on change user password', () => {
            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => logic.changeUserPassword(userData.id, '123123123', '123123123v2', '123123123v2'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => {
                    expect(userData).to.exist
                    expect(userData.name).to.equal('hershel layton')
                    expect(userData.email).to.equal('layton@gmail.com')
                    expect(userData.username).to.equal('layton')
                    expect(userData.image).to.equal(null)
                    expect(userData.role).to.equal('regular')

                    return bcrypt.compare('123123123v2', userData.password)
                })
                .then(match => expect(match).to.be.true)
        })

        it('fails on non-existing user', () => {
            let caught = null

            return logic.changeUserPassword('69bdb0af6273ac63804cb67c', '123123123', '123123123v2', '123123123v2')
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(ExistenceError)
                    expect(caught.message).to.equal('user not found')
                })
        })

        it('fails on wrong password', () => {
            let caught = null

            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => logic.changeUserPassword(userData.id, '123123123_wrong', '123123123v2', '123123123v2'))
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(CredentialError)
                    expect(caught.message).to.equal('incorrect password')

                })
        })


    })


    describe('getUser', () => {
        it('succeeds on get an user', () => {
            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => logic.getUser(userData.id))
                .then(user => {
                    expect(user).to.be.instanceOf(User)
                    expect(user).to.exist
                    expect(user.name).to.equal('hershel layton')
                    expect(user.email).to.equal('layton@gmail.com')
                    expect(user.username).to.equal('layton')
                    expect(user.image).to.equal(null)
                    expect(user.role).to.equal('regular')
                })
        })

        it('fails on non-existing user ', () => {
            let caught = null

            return logic.getUser('69bdb0bf6423ec14804cb67c')
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(ExistenceError)
                    expect(caught.message).to.equal('user not found')
                })
        })
    })

    describe('changeUserImage', () => {
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

    })

    describe('changeUserName', () => {
        it('succeds on change user name', () => {
            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => logic.changeUserName(userData.id, 'hershel layton2'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => {
                    expect(userData).to.exist
                    expect(userData.name).to.equal('hershel layton2')
                    expect(userData.email).to.equal('layton@gmail.com')
                    expect(userData.username).to.equal('layton')
                    expect(userData.image).to.equal(null)
                    expect(userData.role).to.equal('regular')

                    return bcrypt.compare('123123123', userData.password)
                })
                .then(match => expect(match).to.be.true)
        })


        it('fails on non existing user', () => {
            let caught = null

            return logic.changeUserName('69bdb0bf6423ec14804cb67c', 'hershel layton2')
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(ExistenceError)
                    expect(caught.message).to.equal('user not found')
                })
        })
    })


    describe('changeUserUsername', () => {
        it('succeds on change user username', () => {
            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton2', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => logic.changeUserUsername(userData.id, 'layton2'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(userData => {
                    expect(userData).to.exist
                    expect(userData.name).to.equal('hershel layton')
                    expect(userData.email).to.equal('layton@gmail.com')
                    expect(userData.username).to.equal('layton2')
                    expect(userData.image).to.equal(null)
                    expect(userData.role).to.equal('regular')

                    return bcrypt.compare('123123123', userData.password)
                })
                .then(match => expect(match).to.be.true)
        })

        it('fails on non existing user', () => {
            let caught = null

            return logic.changeUserUsername('69bdb0bf6423ec14804cb67c', 'layton2')
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(ExistenceError)
                    expect(caught.message).to.equal('user not found')
                })
        })

    })

    describe('addPet', () => {
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
    })

    describe('getPets', () => {
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

        // gets pets manu 
        /* describe('getPets', () => {
            it('succeeds on existing user and pet', () => {
                return data.insertUser(new UserData(null, 'hershel layton', 'lauton@gmail.com', 'layton', hashed, null, 'regular'))
                    .then(() => data.findUserByEmail('layton@gmail.com'))
                    .then(userData => {
                        return data.insertPet(new PetData(null, userData.id, 'Laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif'))
                            .then(() => logic.getPets(userData.id))
                            .then(pets => {
                                expect(pets).to.have.lengthOf(1)
                                const petData = pets[0]
                                expect(petData).to.exist
                                expect(petData.name).to.equal('laboon')
                                expect(petData.ownerId).to.equal(userData.id)
                            })
                    })
            })
        }) */
    })

    describe('removePet', () => {
        it('succeds on removing a pet', () => {
            let userData
            let petId

            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(ud => {
                    userData = ud
                    return data.insertPet(new PetData(null, userData.id, 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif'))
                })
                .then(() => data.findPetsByUserId(userData.id))
                .then(pets => {
                    petId = pets[0].id
                    return logic.removePet(userData.id, petId)
                })
                .then(() => data.findPetsByUserId(userData.id))
                .then(pets => expect(pets).to.have.lengthOf(0))
        })

        it('fails on non existing user', () => {
            let caught = null

            return logic.removePet('69bdb0bf6423ec14804cb67c', '69bdb0bf6423ec14804cb67c')
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
                .then(userData => logic.removePet(userData.id, '69bdb0bf6423ec14804cb67c'))
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
                                .then(userData => logic.removePet(userData.id, petData.id))
                        })
                })
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(OwnershipError)
                    expect(caught.message).to.equal('user not owner of pet')
                })
        })
    })

    describe('getPet', () => {
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

    })

    describe('modifyPet', () => {
        it('succeds on modifying a pet', () => {
            let userData
            let petId

            return data.insertUser(new UserData(null, 'hershel layton', 'layton@gmail.com', 'layton', hashed, null, 'regular'))
                .then(() => data.findUserByEmail('layton@gmail.com'))
                .then(ud => {
                    userData = ud
                    return data.insertPet(new PetData(null, userData.id, 'laboon', '2025-12-25', 50, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFtanJiNGZsNnBvNmt6anR1OGVrb2NjazA1aWw5cmZtcjR6ZG1hciZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/OUYwfgxa5Ah4jPh4fR/giphy.gif'))
                })
                .then(() => data.findPetsByUserId(userData.id))
                .then(pets => {
                    petId = pets[0].id

                    return logic.modifyPet(
                        userData.id, petId, 'karoo', '2022-11-02', 20, 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJsbXdkb3BqZTF0a2V4ZmQ4MHV4YTQxaWlzbWlteWY4ejE5dHJ2cSZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/cdSuMAFkYsDk64MWcg/giphy.gif'
                    )
                        .then(() => data.findPetById(petId))
                })
                .then(petData => {
                    expect(petData.name).to.equal('karoo')
                    expect(petData.birthdate.getFullYear()).to.equal(2022)
                    expect(petData.birthdate.getMonth()).to.equal(10)
                    expect(petData.birthdate.getDate()).to.equal(2)
                    expect(petData.ownerId).to.equal(userData.id)
                    expect(petData.weight).to.equal(20)
                    expect(petData.image).to.equal('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJsbXdkb3BqZTF0a2V4ZmQ4MHV4YTQxaWlzbWlteWY4ejE5dHJ2cSZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/cdSuMAFkYsDk64MWcg/giphy.gif')
                })
        })

        it('fails on non-existing user', () => {
            let caught = null

            return logic.modifyPet('012345678901234567890123', '012345678901234567890123', 'karoo', '2022-11-02', 20, 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJsbXdkb3BqZTF0a2V4ZmQ4MHV4YTQxaWlzbWlteWY4ejE5dHJ2cSZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/cdSuMAFkYsDk64MWcg/giphy.gif')
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
                .then(userData => logic.modifyPet(userData.id, '012345678901234567890123', 'karoo', '2022-11-02', 20, 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJsbXdkb3BqZTF0a2V4ZmQ4MHV4YTQxaWlzbWlteWY4ejE5dHJ2cSZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/cdSuMAFkYsDk64MWcg/giphy.gif'))
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
                                .then(userData => logic.modifyPet(userData.id, petData.id, 'karoo', '2022-11-02', 20, 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJsbXdkb3BqZTF0a2V4ZmQ4MHV4YTQxaWlzbWlteWY4ejE5dHJ2cSZlcD12MV9pbnRlcm5hbF9naWQmY3Q9Zw/cdSuMAFkYsDk64MWcg/giphy.gif'))
                        })
                })
                .catch(error => caught = error)
                .finally(() => {
                    expect(caught).to.be.instanceOf(OwnershipError)
                    expect(caught.message).to.equal('user not owner of pet')
                })
        })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => database.disconnect())
})