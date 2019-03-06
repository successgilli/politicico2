import express from 'express';
import partyController from './controllers/partyController';
import ValidateParty from './validators/partyValidator';
import OfficeController from './controllers/officeController';
import ValidateOffice from './validators/officeValidator';
import UserController from './controllers/userController';
import checkToken from './helpers/verifyToken';
import isAdmin from './helpers/checkUser';
import Results from './controllers/resultController';
import EmailReset from './controllers/passwordReset';

const { validateCreateParty, validateEditParty } = ValidateParty;
const { createParty, getParty, getAllParties, editParty, deleteParty } = partyController;
const { createOffice, getAllOffices, getOffice } = OfficeController;
const { createOfficeValidator } = ValidateOffice;
const { signUser, signInUser, registerUser, vote, getVotes } = UserController;
const { getOfficeResult } = Results;
const { resetEmail } = EmailReset;
const route = express.Router();
route.post('/parties', validateCreateParty, checkToken, isAdmin, createParty);
route.get('/parties/:partyId([0-9]+)', checkToken, getParty);
route.get('/parties', checkToken, getAllParties);
route.patch('/parties/:partyId([0-9]+)/:name([a-zA-Z0-9]{3,10})', validateEditParty, checkToken, isAdmin, editParty);
route.delete('/parties/:partyId([0-9]+)', checkToken, isAdmin, deleteParty)
route.post('/offices', createOfficeValidator, checkToken, isAdmin, createOffice);
route.get('/offices', checkToken, getAllOffices);
route.get('/offices/:officeId([0-9]+)', checkToken, getOffice);
route.post('/auth/signup', signUser);
route.post('/auth/login', signInUser);
route.post('/office/:userId([0-9]+)/register', checkToken, isAdmin, registerUser);
route.post('/votes',checkToken, vote);
route.post('/office/:officeId([0-9]+)/result', checkToken, getOfficeResult);
route.post('/auth/reset', checkToken, resetEmail);
route.get('/votes/:userId([0-9]+)', checkToken, getVotes);

export default route;