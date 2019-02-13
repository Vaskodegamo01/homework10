const express = require("express");
const User = require("../models/User");
const multer = require("multer");

const auth = require("../middlewares/middleware");

const upload = multer();
const artistsHTML = `<form method="post" id="ajax_form" action=""><div class="form-group"><label for="name">Имя исполнителя</label><input type="text" class="form-control" id="name" name="name" required=""></div><div class="form-group"><label for="image">Фото</label><input type="file" class="form-control" name="image" id="image" required=""></div><div class="form-group"><label for="information">Информация</label><input type="text" class="form-control" id="information" name="information" required=""></div><div style="overflow: hidden; padding-right: .5em;"><input type="submit" id="btn_artist" class="btn btn-primary" value="Отправить"></div></form>`;
const albumsHTML = `<form method="post" id="ajax_form" action=""><div class="form-group"><label for="name">Название Альбома</label><input type="text" class="form-control" id="name" name="name" required=""></div><div class="form-group"><label for="artist">Испольнитель</label><input type="text" class="form-control" id="artist" name="artist" required=""></div><div class="form-group"><label for="datatime">Год выпуска</label><input type="text" class="form-control" id="datatime" name="datatime" required=""></div><div class="form-group"><label for="image">Изображение обложки</label><input type="file" class="form-control" name="image" id="image" required=""></div><div style="overflow: hidden; padding-right: .5em;"><input type="submit" id="btn_album" class="btn btn-primary" value="Отправить"></div></form>`;
const tracksHTML = `<form method="post" id="ajax_form" action=""><div class="container"><button type="button" class="btn btn-default" id="trackinputbuttonById">Track by ID</button><button type="button" class="btn btn-default" id="trackinputbuttonByQuery">Track by query</button></div><div class="form-group"><label for="name">Название Композиции</label><input type="text" class="form-control" id="name" name="name" required=""></div><div class="form-group"><label for="album">Название Альбома</label><input type="text" class="form-control" id="album" name="album" required=""></div><div class="form-group"><label for="time">Продолжительность</label><input type="text" class="form-control" id="time" name="time" required=""></div><div style="overflow: hidden; padding-right: .5em;"><input type="submit" id="btn_album" class="btn btn-primary" value="Отправить"></div></form>`;
const artistsList = `<p2><b>Список Исполнителей</b></p2>`;
const albumsList = `<p2><b>Список Альбомов</b></p2>`;
const tracksList = `<p2><b>Список Треков</b></p2>`;

const createRouter = () => {
    const router = express.Router();

    router.get("/artists", auth, (req,res)=>{
        if(req.user.role === 'admin'){
            res.send(artistsHTML);
        }else
        {
            res.send(artistsList);
        }
    });

    router.get("/albums", auth, (req,res)=>{
        if(req.user.role === 'admin'){
            res.send(albumsHTML);
        }else
        {
            res.send(albumsList);
        }
    });

    router.get("/tracks", auth, (req,res)=>{
        if(req.user.role === 'admin'){
            res.send(tracksHTML);
        }else
        {
            res.send(tracksList);
        }
    });

    router.post("/", upload.none(), (req,res)=>{
        const user = new User({
            username: req.body.username,
            password: req.body.password

        });
        user.generateToken();
        user.save()
            .then(user => res.send({name :user.username, token: user.token}))
            .catch(error =>res.status(400).send(error));
    });

    router.post("/sessions", upload.none(), async (req,res)=>{

        const user = await User.findOne({username:req.body.username});

        if(!user){
            return res.status(400).send({error: "Username not found"});
        }
        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch){
            return res.status(400).send({error: "Password is wrong"});
        }
        user.generateToken();
        await user.save();
       res.send({name :user.username, token: user.token});
    });

    router.delete('/sessions', async (req, res) => {
        const token = req.get('Token');
        const success = {message: 'Success'};

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.token = '';
        user.save();

        return res.send(success);
    });


    return router;
};

module.exports = createRouter;
