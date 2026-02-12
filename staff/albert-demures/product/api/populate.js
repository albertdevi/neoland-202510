const { data, User, Pet } = require('./data')

data.insertUser(new User('user-' + data.usersCount, 'Newt Scamander', 'newt@scamander.com', 'newt', '123123123', 'regular'))
data.insertUser(new User('user-' + data.usersCount, 'Rubeus Hagrid', 'rubeus@hagrid.com', 'hagrid', '123123123', 'regular'))
data.insertUser(new User('user-' + data.usersCount, 'Hermione Granger', 'hermione@granger.com', 'hermione', '123123123', 'regular'))
data.insertUser(new User('user-' + data.usersCount, 'Albus Dumbledore', 'albus@dumbledore.com', 'dumbledore', '123123123', 'regular'))


data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Picket', '2022-05-05', 1, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTdhYXNmd28yMWE4MXJpNHIwam01NWw0d2Fud3V2eDg0NzVscnY2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sm999hwfG7DZnnbK0a/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Niffler', '2022-06-11', 3, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWlkeWhrMWNjeDNkNjZsZGd2Zzgyd2J4MGd3MDUzeXplbzR1N2YyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BtThjFrZkhA2Qzr60r/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Demiguse', '2023-02-09', 26, 'https://i.pinimg.com/originals/f5/a1/3a/f5a13aa18d1212d54f9613642214d3c7.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Thunderbird', '2021-04-12', 55, 'https://i.pinimg.com/originals/98/e0/64/98e064cd4e8d3f42c4587aa4ce32a9ef.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Fluffy', '2021-03-07', 105, 'https://64.media.tumblr.com/4a0897a84dcf2a0e4560db4865996c2d/tumblr_n2t33vYvgS1qdv8mto3_500.gifv'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Buckbeak', '2022-11-02', 64, 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmtiOHJ0czZsaWY2NXhqdHE1Z2prMnBiOTZpNDBzYWNtMXI4bWl4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RVb7TIpCR8TKdZMLx0/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Fang', '2022-04-09', 12, 'https://pa1.aminoapps.com/6615/a8945fac4df53f11a06153bf56fdf64f7695d2f1_hq.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-2', 'Crookshanks', '2022-10-12', 3, 'https://hips.hearstapps.com/hmg-prod/images/crookshanks-1567510916.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Fawkes', '2023-10-04', 15, 'https://pa1.aminoapps.com/6392/37f98f5ffb3a9956dcb34013232132cc20d9edf7_hq.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Qilin', '2023-12-22', 6, 'https://media.tenor.com/pf7vko-ho7kAAAAM/qilin-chillin.gif'))

