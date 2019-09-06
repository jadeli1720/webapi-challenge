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

router.get('/:id', validateActiontId, (req,res) => {
    res.status(200).json(req.action)

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

router.put('/', (req,res) => {

});

//custom middleware

//validates action id on all endpoints using id parameters
function validateActiontId(req, res, next) {
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


module.exports = router;