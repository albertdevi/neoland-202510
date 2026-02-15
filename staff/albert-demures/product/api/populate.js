const { data, User, Pet } = require('./data')

data.insertUser(new User('user-' + data.usersCount, 'Newt Scamander', 'newt@scamander.com', 'newt', '123123123', 'regular', 'https://cdn.prod.website-files.com/656b574d4c3db5a4d0ef52fa/65bfd725125bf7226cde3344_AdinaABA%20(15).jpg' ))
data.insertUser(new User('user-' + data.usersCount, 'Rubeus Hagrid', 'rubeus@hagrid.com', 'hagrid', '123123123', 'regular', 'https://i.pinimg.com/474x/94/e7/8b/94e78bcecce6ed3b1de1f3c58c1e55a5.jpg'))
data.insertUser(new User('user-' + data.usersCount, 'Hermione Granger', 'hermione@granger.com', 'hermione', '123123123', 'regular', 'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/7154725/harry-potter-top-10-hermione-granger-moments-hermione-granger-358045.jpg?quality=90&strip=all&crop=0,15.095986038394,100,69.808027923211'))
data.insertUser(new User('user-' + data.usersCount, 'Albus Dumbledore', 'albus@dumbledore.com', 'dumbledore', '123123123', 'regular', 'https://upload.wikimedia.org/wikipedia/en/e/e8/Dumbledore_-_Prisoner_of_Azkaban.jpg'))


data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Picket', '2022-05-05', 1, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTdhYXNmd28yMWE4MXJpNHIwam01NWw0d2Fud3V2eDg0NzVscnY2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sm999hwfG7DZnnbK0a/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Niffler', '2022-06-11', 3, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWlkeWhrMWNjeDNkNjZsZGd2Zzgyd2J4MGd3MDUzeXplbzR1N2YyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BtThjFrZkhA2Qzr60r/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Demiguse', '2023-02-09', 26, 'https://i.pinimg.com/originals/f5/a1/3a/f5a13aa18d1212d54f9613642214d3c7.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Thunderbird', '2021-04-12', 55, 'https://i.pinimg.com/originals/98/e0/64/98e064cd4e8d3f42c4587aa4ce32a9ef.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Fluffy', '2021-03-07', 105, 'https://64.media.tumblr.com/4a0897a84dcf2a0e4560db4865996c2d/tumblr_n2t33vYvgS1qdv8mto3_500.gifv'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Buckbeak', '2022-11-02', 64, 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmtiOHJ0czZsaWY2NXhqdHE1Z2prMnBiOTZpNDBzYWNtMXI4bWl4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RVb7TIpCR8TKdZMLx0/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Norbert', '2022-04-09', 12, 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJ6NTlseDU4NW8wejh3MHFnYjI5ZDA3Yjg2dGh0NnRuZm5kOGo3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U5LrqT9xquVMpgsj6F/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-2', 'Crookshanks', '2022-10-12', 3, 'https://hips.hearstapps.com/hmg-prod/images/crookshanks-1567510916.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Fawkes', '2023-10-04', 15, 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHFjb29md3Nzdzc3N3U4ZDZuYTRqOXY1N2Z2YTdidnlwb3B6N2l3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3mUtFnjqWfy2FF4iUf/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Qilin', '2023-12-22', 6, 'https://media.tenor.com/pf7vko-ho7kAAAAM/qilin-chillin.gif'))

