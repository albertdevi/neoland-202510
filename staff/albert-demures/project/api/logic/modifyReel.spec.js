import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, ReelData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('modifyReel', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user and reel', () => {
        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))
            .then(userData => {
                return data.insertReel(new ReelData(null, userData.id, 'red', 'orange'))

                    .then(() => logic.modifyReel(userData.id, 'blue', 'green'))
                    .then(() => data.findReelByUserId(userData.id))
            })

            .then(reelData => {
                expect(reelData.textColor).to.equal('blue')
                expect(reelData.backgroundColor).to.equal('green')
            })
    })



    it('fails on non-existing user', () => {
        let caught = null

        return logic.modifyReel('012345678901234567890123', 'blue', 'green')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing reel', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Biblioteca Abrera', 'biblioteca@abrera.com', hashed, null))
            .then(() => data.findUserByEmail('biblioteca@abrera.com'))

            .then(userData => logic.modifyReel(userData.id, 'blue', 'green'))

            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('reel not found')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllArticles(),
        data.deleteAllReels()
    ]))

    after(() => disconnect())
})
