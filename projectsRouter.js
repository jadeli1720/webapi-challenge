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

//This grabbed the project of specified id and all of it's actions/
router.get('/:id', validateUserId, (req,res) => {
    res.status(200).json(req.project)

});

//do we need?
router.get('/:id/actions', (req,res) => {

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

//custom middleware

//validates user id on all endpoints using id parameters
function validateUserId(req, res, next) {
    const { id } = req.params
    Project.get(id)
        .then(project => {
            console.log(project)
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({ message: "invalid project id" })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "Could not validate project with the specified id" })
        })

};


module.exports = router;
