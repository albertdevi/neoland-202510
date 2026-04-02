import bcrypt from 'bcryptjs'

import { connect, disconnect, UserModel, PetModel } from './mongoose/index.js'

connect('mongodb://localhost:27017/product')
  .then(() => bcrypt.hash('123123123', 10))
  .then(hash => {
    const newt = new UserModel({ name: 'Newt Scamander', email: 'newt@gmail.com', username: 'Newt', password: hash })

    const hagrid = new UserModel({ name: 'Hagrid Rubeus', email: 'hagrid@gmail.com', username: 'Hagrid', password: hash })

    const dumbledore = new UserModel({ name: 'Albus Dumbledore', email: 'dumbledore@gmail.com', username: 'Dumbledore', password: hash })

    return Promise.all([newt.save(), hagrid.save(), dumbledore.save()])
      .then(([newt, hagrid, dumbledore]) => {
        console.log(newt, hagrid, dumbledore)

        const picket = new PetModel({ owner: newt.id, name: 'Picket', birthdate: new Date('2020-02-20'), weight: 0.08, image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGN3eGhzcTg3bDVkZ2t2NG04c3hhb3YyeGk3NGE4ZnZqMThrb2ZxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zc0MAAfDnxENE4NkEv/giphy.gif' })

        const escarbato = new PetModel({ owner: newt.id, name: 'Escarbato', birthdate: new Date('2021-02-11'), weight: 0.5, image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmRjZGRuaHd4YXY1MGM1aWF4eWpmcTJkcWFibWhxd3d1NHYxY3AycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9NyM4FWtm1rws/giphy.gif' })

        const thunderbird = new PetModel({ owner: newt.id, name: 'Thunderbird', birthdate: new Date('2011-04-05'), weight: 87, image: 'https://i.pinimg.com/originals/98/e0/64/98e064cd4e8d3f42c4587aa4ce32a9ef.gif' })

        const demiguse = new PetModel({ owner: newt.id, name: 'Demiguse', birthdate: new Date('2015-11-11'), weight: 12, image: 'https://i.pinimg.com/originals/f5/a1/3a/f5a13aa18d1212d54f9613642214d3c7.gif' })

        const buckbeak = new PetModel({ owner: hagrid.id, name: 'Buckbeak', birthdate: new Date('2018-07-10'), weight: 70, image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1wNmdhcHRhNm5tdmw0ZmthYjI5ZzlnenBjaDRyemZmNW5xc3I5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RVb7TIpCR8TKdZMLx0/giphy.gif' })

        const fluffy = new PetModel({ owner: hagrid.id, name: 'Fluffy', birthdate: new Date('2008-05-05'), weight: 150, image: 'https://64.media.tumblr.com/4a0897a84dcf2a0e4560db4865996c2d/tumblr_n2t33vYvgS1qdv8mto3_500.gifv' })

        const norbert = new PetModel({ owner: hagrid.id, name: 'Norbert', birthdate: new Date('2018-11-23'), weight: 0.8, image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJ6NTlseDU4NW8wejh3MHFnYjI5ZDA3Yjg2dGh0NnRuZm5kOGo3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U5LrqT9xquVMpgsj6F/giphy.gif' })

        const fawkes = new PetModel({ owner: dumbledore.id, name: 'Fawkes', birthdate: new Date('2002-10-04'), weight: 3, image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHFjb29md3Nzdzc3N3U4ZDZuYTRqOXY1N2Z2YTdidnlwb3B6N2l3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3mUtFnjqWfy2FF4iUf/giphy.gif' })

        const qilin = new PetModel({ owner: dumbledore.id, name: 'qilin', birthdate: new Date('2025-10-04'), weight: 3, image: 'https://media.tenor.com/pf7vko-ho7kAAAAM/qilin-chillin.gif' })

        return Promise.all([picket.save(), escarbato.save(), buckbeak.save(), thunderbird.save(), demiguse.save(), fluffy.save(), norbert.save(), fawkes.save(), qilin.save()])

      })
      .then(([picket, escarbato, buckbeak, thunderbird, demiguse, fluffy, norbert, fawkes, qilin]) =>
        console.log(picket, escarbato, buckbeak, thunderbird, demiguse, fluffy, norbert, fawkes, qilin))
  })
  .catch(error => console.error(error))
  .finally(() => disconnect())