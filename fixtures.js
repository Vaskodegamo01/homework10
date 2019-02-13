const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Track = require('./models/Track');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');

    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    console.log('collection is dropped');

    const [user, admin] = await User.create({
        username:'user',
        password: '123',
        role: "user"
},{
        username:'admin',
        password: '123',
        role: "admin"
    });
    console.log('user created');

    const [art1, art2, art3, art4] = await Artist.create({
        name: "Дженнифер Лопес",
        image: "0DJVbzgEZnNgJwl7Kxy7q.jpeg",
        information: "Американская актриса, певица, танцовщица, модельер, продюсер и бизнесвумен.",
        userId: admin._id
    },{
        name: "Иосиф Кобзон",
        image: "46FkMx5C7NvCjSCRmKEcT.jpeg",
        information: "Советский и российский эстрадный певец, российский политический и общественный деятель, музыкальный педагог.",
        userId: admin._id
    },{
        name: "Лев Лещенко",
        image: "bQBKiBx1FS-FZ3qTKFXau.jpeg",
        information: "Советский и российский эстрадный певец. Народный артист РСФСР.",
        userId: admin._id
    },{
        name: "Валерий Кипелов",
        image: "CfvQW1LW9ybKzoEJoucPd.jpeg",
        information: "Российская рок-группа под руководством Валерия Кипелова, играющая в стиле хеви-метал и симфоник-метал, основанная в 2002 году.",
        userId: admin._id
    });

    console.log("Artist created");

    const [album1, album2, album3, album4, album5, album6, album7, album8] = await Album.create({
        name: "On the 6",
        artist: art1._id,
        datatime: "1999",
        image: "G1yN32-5KRMWGYmHnXnhA.jpeg",
        userId: admin._id
    },{
        name: "J.Lo",
        artist: art1._id,
        datatime: "2001",
        image: "Gh6ixshAuhD0pH1JyZzzK.jpeg",
        userId: admin._id
    },{
        name: "Мгновения",
        artist: art2._id,
        datatime: "2007",
        image: "gY-ctQzHb0CWsqV6Ycnd6.jpeg",
        userId: admin._id
    },{
        name: "Всё повторяется",
        artist: art2._id,
        datatime: "2009",
        image: "MsY1k2IuepPl7SKHf2z-R.jpeg",
        userId: admin._id
    },{
        name: "Соловьиная роща",
        artist: art3._id,
        datatime: "2014",
        image: "MtSaRcdRB9IP92webk03R.jpeg",
        userId: admin._id
    },{
        name: "Песни победы",
        artist: art3._id,
        datatime: "2016",
        image: "rI444_QoVTOALMEJk8YqN.jpeg",
        userId: admin._id
    },{
        name: "Мания величия",
        artist: art4._id,
        datatime: "1985",
        image: "dDdOLtCWI_0maystJci7H.jpeg",
        userId: admin._id
    },{
        name: "С кем ты?",
        artist: art4._id,
        datatime: "1986",
        image: "C_GfuFBfNGFU-k6x33loq.jpeg",
        userId: admin._id
    });

    console.log("Album created");

    const [track01, track02, track03, track04, track05, track06, track07, track08, track09, track10,
        track11, track12, track13, track14, track15, track16, track17, track18, track19, track20,
        track21, track22, track23, track24, track25, track26, track27, track28, track29, track30,
        track31, track32, track33, track34, track35, track36, track37, track38, track39, track40] = await Track.create({
        name: "If You Had My Love",
        album: album1._id,
        time: "4:25",
        userId: admin._id
    },{
        name: "Should've Never",
        album: album1._id,
        time: "6:14",
        userId: admin._id
    },{
        name: "Too Late",
        album: album1._id,
        time: "4:27",
        userId: admin._id
    },{
        name: "Feelin' So Good",
        album: album1._id,
        time: "5:27",
        userId: admin._id
    },{
        name: "Let’s Get Loud",
        album: album1._id,
        time: "3:59",
        userId: admin._id
    },{
        name: "Love Don’t Cost a Thing",
        album: album2._id,
        time: "3:42",
        userId: admin._id
    },{
        name: "I’m Real",
        album: album2._id,
        time: "4:57",
        userId: admin._id
    },{
        name: "Play",
        album: album2._id,
        time: "3:32",
        userId: admin._id
    },{
        name: "Walking on Sunshine",
        album: album2._id,
        time: "3:46",
        userId: admin._id
    },{
        name: "Ain’t It Funny",
        album: album2._id,
        time: "4:06",
        userId: admin._id
    },{
        name: "Мгновения",
        album: album3._id,
        time: "3:05",
        userId: admin._id
    },{
        name: "Наша любовь",
        album: album3._id,
        time: "3:21",
        userId: admin._id
    },{
        name: "Женщине, которую люблю",
        album: album3._id,
        time: "5:16",
        userId: admin._id
    },{
        name: "Ноктюрн",
        album: album3._id,
        time: "4:52",
        userId: admin._id
    },{
        name: "С чего начинается Родина?",
        album: album3._id,
        time: "2:45",
        userId: admin._id
    },{
        name: "Всё повторяется",
        album: album4._id,
        time: "3:02",
        userId: admin._id
    },{
        name: "Малиновый звон",
        album: album4._id,
        time: "3:39",
        userId: admin._id
    },{
        name: "Севастополь",
        album: album4._id,
        time: "4:37",
        userId: admin._id
    },{
        name: "Баллада о неизвестном солдате",
        album: album4._id,
        time: "3:58",
        userId: admin._id
    },{
        name: "Черноморская сторона",
        album: album4._id,
        time: "3:23",
        userId: admin._id
    },{
        name: "Соловьиная роща",
        album: album5._id,
        time: "3:48",
        userId: admin._id
    },{
        name: "Родная земля",
        album: album5._id,
        time: "4:36",
        userId: admin._id
    },{
        name: "Ни минуты покоя",
        album: album5._id,
        time: "3:28",
        userId: admin._id
    },{
        name: "Горький мёд",
        album: album5._id,
        time: "2:29",
        userId: admin._id
    },{
        name: "Городские цветы",
        album: album5._id,
        time: "4:03",
        userId: admin._id
    },{
        name: "День победы",
        album: album6._id,
        time: "3:51",
        userId: admin._id
    },{
        name: "Три танкиста",
        album: album6._id,
        time: "3:28",
        userId: admin._id
    },{
        name: "Мы за ценой не постоим",
        album: album6._id,
        time: "3:10",
        userId: admin._id
    },{
        name: "Когда поют солдаты",
        album: album6._id,
        time: "1:23",
        userId: admin._id
    },{
        name: "Тёмная ночь",
        album: album6._id,
        time: "3:25",
        userId: admin._id
    },{
        name: "Это рок",
        album: album7._id,
        time: "5:54",
        userId: admin._id
    },{
        name: "Тореро",
        album: album7._id,
        time: "5:29",
        userId: admin._id
    },{
        name: "Волонтёр",
        album: album7._id,
        time: "8:24",
        userId: admin._id
    },{
        name: "Бивни чёрных скал",
        album: album7._id,
        time: "4:51",
        userId: admin._id
    },{
        name: "Мания величия",
        album: album7._id,
        time: "1:49",
        userId: admin._id
    },{
        name: "Воля и разум",
        album: album8._id,
        time: "4:34",
        userId: admin._id
    },{
        name: "Встань, страх преодолей",
        album: album8._id,
        time: "4:16",
        userId: admin._id
    },{
        name: "Здесь куют металл",
        album: album8._id,
        time: "4:42",
        userId: admin._id
    },{
        name: "С кем ты?",
        album: album8._id,
        time: "4:43",
        userId: admin._id
    },{
        name: "Без тебя",
        album: album8._id,
        time: "4:24",
        userId: admin._id
    });

    console.log("Track created");
    db.close();
});
