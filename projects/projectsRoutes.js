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

    console.log(req.params.id);

    const { id } = req.params;

    dbProjects.getProjectActions(id)
        .then((actions) => {
            res.status(200).json(actions);
        })
        .catch((err) => {
            res.status(500).json({ error: "Couldn't find the actions."})
        })
})


/// adding a project

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
      const newProject = await dbProjects.insert(req.body);
        res.json({ message: newProject });
    } catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
  });

/// updating a project

router.put('/:id', async (req, res) => {
	try {
		const project = await dbProjects.update(req.params.id, req.body);
		if (project) {
			res.status(200).json(project);
		} else {
			res.status(404).json({ message: 'The project could not be found.' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error editing project.' });
	}
});

/// deleting a project 

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const count = await dbProjects.remove(id);
		if (count > 0) {
			res.status(200).json({ message: 'The project has been deleted' });
		} else {
			res.status(404).json({ message: 'The project could not be found.' });
		}
	} catch (err) {
		res.status(500).json({ message: 'The project could not be deleted.' });
	}
});


module.exports = router;