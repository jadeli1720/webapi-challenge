const express = require('express');
const Project = require('./data/helpers/projectModel');


const router = express.Router();

router.use(express.json());

/************************* GET **************************/

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ error: "The project information could not be retrieved" })
        })
});

//This grabbed the project of specified id and all of it's actions/
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)

});


router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params;

    postMessage.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ error: "The actions specified by that id could not be retrieved" })
        })
});


/************************* POST **************************/

router.post('/', validatProject, (req, res) => {
    const project = req.body;

    Project.insert(project)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        })
});


/************************* Delete **************************/

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.project;
    Project.remove(id)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => {
            res.status(500).json({ error: "The project with the specified could not be deleted" })
        });
});


/************************* Update **************************/

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    Project.update(id, { name, description })
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be modified." })
        })
});

//custom middleware

//validates project id on all endpoints using id parameters
function validateProjectId(req, res, next) {
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

//validates projects  when one is being create
function validatProject(req, res, next) {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ errorMessage: "A name and a description is required" })
    }
    if (typeof name !== "string" || typeof description !== 'string') {
        return res.status(400).json({ errorMessage: "The name and description must be strings" })
    }
    req.body = { name, description };
    next()
}

function validatActionId(req, res, next) {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ errorMessage: "A name and a description is required" })
    }
    if (typeof name !== "string" || typeof description !== 'string') {
        return res.status(400).json({ errorMessage: "The name and description must be strings" })
    }
    req.body = { name, description };
    next()
}




module.exports = router;
