import './tracing';
import express from 'express';
import { User } from './models/User';
import { UserView } from './models/UserView';
import { UserDisplay } from './models/UserDisplay';

const app = express();
const port = 3000;

app.get('/user/:id', (req, res) => {
  const user = new User('Alice', 'Smith', 28);
  const view = new UserView(user);
  const display = new UserDisplay(view);
  res.json(display);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
