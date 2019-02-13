const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Albums = require("../models/Album");
const Artists = require("../models/Artist");
const auth = require("../middlewares/middleware");
const permit = require("../middlewares/permit");

const storage = multer.diskStorage({
    destination(req, file, cd){
        cd(null, config.uploadPath)
    },
    filename(req, file, cd){
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});


const router = express.Router();

router.get("/", auth, async (req, res) => {
    if(req.query.artist){
        Albums.find({artist : req.query.artist})
            .then( results => res.send(results))
            .catch(e => res.send(e).status(500))
    }else{
        let rr=[];
        let tmp = await Albums.find();
        for(let i=0; i<tmp.length; i++){
            rr.push(JSON.parse(JSON.stringify(tmp[i])));
            rr[i].button='0';
            if(req.user.role === 'admin'){
                rr[i].button='1';
            }else{
                rr[i].button='0';
            }
        }
        res.send(rr);
    }
});

router.get("/:id", auth, (req, res) => {
    Albums.findOne({_id : req.params.id}).populate('artist')
        .then( results => res.send(results))
        .catch(e => res.send(e).status(500))
});

router.post("/", [auth, permit('admin'), upload.single("image")], async (req, res) => {
    const albumData = req.body;
    if (req.file) albumData.image = req.file.filename;

    await  Artists.findOne({name : albumData.artist})
        .then( results =>  albumData.artist = results)
        .catch(e => res.send(e).status(500));

    const albums = new Albums(albumData);
    albums.userId = req.user._id;
    albums.save()
        .then( () => res.send(albumData))
        .catch(e => res.send(e).status(500))

});

router.delete('/delete/:id', [auth, permit('admin')], (req, res)=>{
    Albums.deleteOne({_id: req.params.id})
        .then(result => res.send(result))
        .catch((e)=>res.send(e).status(500))
});

module.exports = router;