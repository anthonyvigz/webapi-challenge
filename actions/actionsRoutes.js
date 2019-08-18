const express = require('express');
const dbActions = require('../data/helpers/actionModel');
const router = express.Router();

/// main get request for actions

router.get('/', async (req, res) => {
	try {
		const actions = await dbActions.get(req.id);
		res.status(200).json(actions);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving actions.' });
	}
});

/// get specific actions for an id

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const action = await dbActions.get(id);
		res.status(200).json(action);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving actions.' });
	}
});

/// post an action to a specific id

router.post('/:id', async (req, res) => {
	const actionInfo = { ...req.body, project_id: req.params.id };
	try {
		const action = await dbActions.insert(actionInfo);
		res.status(201).json(action);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving actions.' });
	}
});

/// delete an action from a specific id

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const count = await dbActions.remove(id);
		if (count > 0) {
			res.status(200).json(action);
		} else {
			res.status(404).json({ message: 'The action could not be found.' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving actions.' });
	}
});

/// updating an action for a specific id

router.put('/:id', async (req, res) => {
	try {
		const action = await dbActions.update(req.params.id, req.body);
		if (action) {
			res.status(200).json(action);
		} else {
			res.status(404).json({ message: 'Action could not be found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving actions.' });
	}
});


module.exports = router;