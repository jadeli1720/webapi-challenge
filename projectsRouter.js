const express = require('express');
const Project = require('./data/helpers/projectModel');


const router = express.Router();

router.use(express.json());

/************************* GET **************************/

router.get('/', (req, res) => {
    Project.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: "The project information could not be retrieved" })
        })
});

router.get('/', (req,res) => {

});

router.get('/', (req,res) => {

});


/************************* POST **************************/

router.post('/', (req,res) => {

});

router.post('/', (req,res) => {

});

/************************* Delete **************************/

router.delete('/', (req,res) => {

});


/************************* Update **************************/

// router.update('/', (req,res) => {

// });


module.exports = router;
