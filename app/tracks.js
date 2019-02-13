const express = require("express");
const multer = require("multer");
const Track =require("../models/Track");
const Albums = require("../models/Album");
const auth = require("../middlewares/middleware");
const permit = require("../middlewares/permit");

const upload = multer();

const createRouter = () => {
    const router = express.Router();

    router.get("/", (req,res)=>{
            if(req.query.album){
                Track.find({album : req.query.album})
                    .then( results => res.send(results))
                    .catch(e => res.send(e).status(500));
                return;
            }
           Track.find()
                .then(result => res.send(result))
                .catch(()=>res.sendStatus(500));

    });

    router.get("/:id", (req, res) => {
        Albums.find({artist : req.params.id})
            .then(  (results) => {
                let tracksById = [];
                results.forEach(async (album)=>{

                    tracksById.push(await Track.findOne({album : album._id}));
                    if(tracksById.length === results.length){
                        res.send(tracksById);
                    }
                });
            })
            .catch(e => res.send(e).status(500));
    });

    router.post("/", [auth, permit('admin'), upload.none()], async (req, res) => {
        const TrackData = req.body;
        await Albums.findOne({name : TrackData.album})
            .then( results =>  TrackData.album = results)
            .catch(e => res.send(e).status(500));

            const track = new Track(TrackData);
        track.userId = req.user._id;
        await track.save()
            .then( () => res.send(TrackData))
            .catch(e => res.send(e).status(500))

    });
    return router;
};

module.exports = createRouter;