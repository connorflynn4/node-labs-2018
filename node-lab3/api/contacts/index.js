import express from 'express';
import Contact from './contactModel';

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
  Contact.find((err, contacts) => {
    if (err) return handleError(res, err);
    return res.json(200, contacts);
  });
});

router.post('/', (req, res) => {
  Contact.create(req.body, function(err, contact) {
    if (err) return handleError(res, err);
    return res.json(201, contact);
  });
});

// Update a contact
router.put('/:id', (req, res) => {
  if (req.body._id) delete req.body._id;
  Contact.findById(req.params.id, (err, contact) => {
    if (err) return handleError(res, err);
    if (!contact) return res.send(404);
    const updated = _.merge(contact, req.body);
    updated.save((err) => {
      if (err) return handleError(res, err);
      return res.json(200, contact);
    });
  });
});

// Delete a contact
router.delete('/:id', (req, res) => {
  Contact.findById(req.params.id, (err, contact) => {
    if (err) return handleError(res, err);
    if (!contact) return res.send(404);
    contact.remove(function(err) {
      if (err) return handleError(res, err);
      return res.send(204);
    });
  });
});

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.send(500, err);
};

export default router;