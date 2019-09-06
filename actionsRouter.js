const express = require('express');
const Action = require('./data/helpers/actionModel');

const router = express.Router();

router.use(express.json());


/************************* GET **************************/
router.get('/', (req, res) => {
    Action.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ error: "The action information could not be retrieved" })
        })

});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)

});


/************************* POST **************************/

router.post('/:id', validateAction, (req, res) => {
    const action = req.body;

    Action.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        })
});

/************************* Delete **************************/

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.action;
    Action.remove(id)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => {
            res.status(500).json({ error: "The action with the specified could not be deleted" })
        });
});


/************************* Update **************************/

router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;

    Action.update(id, { description, notes })
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be modified." })
        })
});

//custom middleware

//validates action id on all endpoints using id parameters
function validateActionId(req, res, next) {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            console.log(action)
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(400).json({ message: "invalid action id" })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "Could not validate action with the specified id" })
        })

};


function validateAction(req, res, next) {
    const { id:project_id } = req.params;
    const { description, notes } = req.body;

    if (!req.body) {
        return res.status(400).json({ error: "Action is missing a description and notes." })
    }
    if ( !project_id ) {
        return res.status(404).json({ error: "Action is missing a project_id" })
    }

    req.body = { project_id, description, notes };
    next();
}


module.exports = router;