import bcrypt from 'bcryptjs'
import { connect, disconnect, UserModel, ArticleModel, ReelModel } from './index.js'


connect('mongodb://localhost:27017/project')
    .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        const zooDelsPirineus = new UserModel({ name: 'Zoo dels Pirineus', email: 'zoodelspirineus@gmail.com', password: hash })
        const celtian = new UserModel({ name: 'Celtian', email: 'celtian@gmail.com', password: hash })
        const bibliotecaAbrera = new UserModel({ name: 'Biblioteca Abrera', email: 'bibliotecaabrera@gmail.com', password: hash })

        return Promise.all([zooDelsPirineus.save(), celtian.save(), bibliotecaAbrera.save()])
            .then(([zooDelsPirineus, celtian, bibliotecaAbrera]) => {
                console.log(zooDelsPirineus, celtian, bibliotecaAbrera)

                const article1 = new ArticleModel({ owner: zooDelsPirineus.id, title: 'Animales en peligro en zonas de pícnic', subtitle: 'Zorros que piden comida', date: new Date('2026-03-10'), paragraph0: 'Lo que necesitaban no era solo atención básica: requerían un hogar seguro adaptado a sus necesidades. Pero, como muchas otras organizaciones, nos enfrentábamos a un desafío: los recursos eran limitados y la compra de materiales para construir estos espacios adecuados parecía una misión difícil de alcanzar.', image0: 'https://zoodelpirineu.com/wp-content/uploads/2025/02/Cria-de-zorro.jpg', paragraph1: 'Lo que necesitaban no era solo atención básica: requerían un hogar seguro adaptado a sus necesidades. Pero, como muchas otras organizaciones, nos enfrentábamos a un desafío: los recursos eran limitados y la compra de materiales para construir estos espacios adecuados parecía una misión difícil de alcanzar.', image1: 'https://zoodelpirineu.com/wp-content/uploads/2025/02/Zorros-Murri-y-Merce-en-el-santuario.jpg', paragraph2: 'Lo que necesitaban no era solo atención básica: requerían un hogar seguro adaptado a sus necesidades. Pero, como muchas otras organizaciones, nos enfrentábamos a un desafío: los recursos eran limitados y la compra de materiales para construir estos espacios adecuados parecía una misión difícil de alcanzar.', image2: 'https://zoodelpirineu.com/wp-content/uploads/2025/02/Zorros-Murri-y-Merce-en-la-clinica-768x576.jpg', paragraph3: 'Lo que necesitaban no era solo atención básica: requerían un hogar seguro adaptado a sus necesidades. Pero, como muchas otras organizaciones, nos enfrentábamos a un desafío: los recursos eran limitados y la compra de materiales para construir estos espacios adecuados parecía una misión difícil de alcanzar.', image3: 'https://zoodelpirineu.com/wp-content/uploads/2025/02/Merce-un-zorro-invidente-768x576.jpg', visibility: 'public' })

                const article2 = new ArticleModel({ owner: zooDelsPirineus.id, title: 'Exhibición de vuelo con descuento', subtitle: 'Un plan que anima el día', date: new Date('2026-02-11'), paragraph0: 'Hay momentos que te sacan de lo de siempre y te hacen sentir que el día ha merecido la pena. La exhibición de vuelo en el Zoo de los Pirineos es uno de ellos.', image0: 'https://zoodelpirineu.com/wp-content/uploads/2023/01/Eloi-Arenas-con-cernicalo.jpg', paragraph1: 'Hay momentos que te sacan de lo de siempre y te hacen sentir que el día ha merecido la pena. La exhibición de vuelo en el Zoo de los Pirineos es uno de ellos.', image1: 'https://zoodelpirineu.com/wp-content/uploads/2023/01/Lechuza-Tyto-alba.jpg', paragraph2: 'Hay momentos que te sacan de lo de siempre y te hacen sentir que el día ha merecido la pena. La exhibición de vuelo en el Zoo de los Pirineos es uno de ellos.', image2: 'https://zoodelpirineu.com/wp-content/uploads/2023/09/Halcon-peregrino-768x576.jpg', paragraph3: 'Hay momentos que te sacan de lo de siempre y te hacen sentir que el día ha merecido la pena. La exhibición de vuelo en el Zoo de los Pirineos es uno de ellos.', image3: 'https://zoodelpirineu.com/wp-content/uploads/2023/01/Toca-toca-con-animales-domesticos.jpg', visibility: 'public' })

                const reel1 = new ReelModel({ owner: zooDelsPirineus.id, textColor: '#261f0b', backgroundColor: 'white' })

                const reel2 = new ReelModel({ owner: celtian.id, textColor: '#460909', backgroundColor: 'blue' })

                const reel3 = new ReelModel({ owner: bibliotecaAbrera.id, textColor: '#261f0b', backgroundColor: 'yellow' })


                return Promise.all([article1.save(), article2.save(), reel1.save(), reel2.save(), reel3.save()])
            })
            .then(([article1, article2, reel1, reel2, reel3]) => console.log(article1, article2, reel1, reel2, reel3))
    })
    .catch(error => console.error(error))
    .finally(() => disconnect())