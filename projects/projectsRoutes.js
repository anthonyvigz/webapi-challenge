const express = require('express');
const dbProjects = require('../data/helpers/projectModel');
const router = express.Router();

/// main get request for projects

router.get('/', (req, res) => {

    dbProjects.get()
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((err) => {
            res.status(500).json({ error: "Projects could not be retrieved."})
        });
});

/// getting specific project

router.get('/:id', (req, res) => {

    const { id } = req.params;

    dbProjects.get(id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            res.status(500).json({ error: "Couldn't find the project."})
        })
})

/// getting specific actions for a project

router.get('/:id/actions', (req, res) => {

    const { id } = req.params;

    dbProjects.getProjectActions(id)
        .then((actions) => {
            res.status(200).json(actions);
        })
        .catch((err) => {
            res.status(500).json({ error: "Couldn't find the actions."})
        })
})


module.exports = router;