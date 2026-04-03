import bcrypt from 'bcryptjs';
import { dataBase, UserModel, NewModel } from './models.js';

dataBase.connect('mongodb://localhost:27017/project')
    .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        const zooDelsPirineus = new UserModel({ name: 'Zoo dels Pirineus', email: 'zoodelspirineus@gmail.com', password: hash });
        const celtian = new UserModel({ name: 'Celtian', email: 'celtian@gmail.com', password: hash });
        const bibliotecaAbrera = new UserModel({ name: 'Biblioteca Abrera', email: 'bibliotecaabrera@gmail.com', password: hash });

        return Promise.all([
            zooDelsPirineus.save(),
            celtian.save(),
            bibliotecaAbrera.save()
        ]);
    })
    .then(([zooDelsPirineus, celtian, bibliotecaAbrera]) => {
        console.log(zooDelsPirineus, celtian, bibliotecaAbrera);
    })
    .catch(error => console.error(error))
    .finally(() => dataBase.disconnect());