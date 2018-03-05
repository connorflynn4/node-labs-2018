
import express from 'express';
import {contacts} from './contacts';

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
  res.send({contacts: contacts});
});

router.post('/', (req, res) => {
        let newContact = req.body;
        if (newContact){
          contacts.push({name: newContact.name, address : newContact.address, phone_number: newContact.phone_number }) ;
          res.status(201).send({message: "Contact Created"});
      }else{
            res.status(400).send({message: "Unable to find Contact in request. No Contact Found in body"});
      }
});

// Update a contact
router.put('/:id', (req, res) => {
     const key = req.params.id;
     const updateContact = req.body;
     const index = contacts.map((contact)=>{
return contact.phone_number;
}).indexOf(key);
            if (index !== -1) {
               contacts.splice(index, 1, {name: updateContact.name, address: updateContact.address,
               phone_number: updateContact.phone_number});
               res.status(200).send({message: 'Contact Updated'});
              } else {
          res.status(400).send({message: 'Unable to find Contact in request. No Contact Found in body'});
      }
});

// Delete a contact
router.delete('/:id', (req, res) => {
     const key = req.params.id;
     const index = contacts.map((contact)=>{
return contact.phone_number;
}).indexOf(key);
    if (index > -1) {
contacts.splice(index, 1);
        res.status(200).send({message: `Deleted contact with phone_number: ${key}.`});
    } else {
      res.status(400).send({message: `Unable to find contact with phone_number: ${key}.`});
      }
});

export default router;