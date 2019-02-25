import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import createTables from './model/migrations';
import route from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.use('/', (req, res) => {
  res.json('route not available');
})
createTables();
export default app.listen(process.env.PORT || 8080, () => {
  console.log('listening on port 8080');
})