import express from 'express';
import partyController from './controllers/partyController';
import ValidateParty from './validators/partyValidator';

const { validateCreateParty } = ValidateParty;
const { createParty } = partyController;
const route = express.Router();

route.post('/parties', validateCreateParty, createParty);

export default route;