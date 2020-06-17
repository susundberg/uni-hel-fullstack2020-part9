import express from 'express';
import cors from 'cors';
import config from './config';
import patients from '../data/patients';
import diagnoses from '../data/diagnoses';
import { parsePatientNew } from '../data/parsers';

const app = express();
app.use(cors());
app.use(express.json());



app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.json({ pong: true });
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoses.get());
});

app.get('/api/patients/:id', (req, res) => {
  const id = String(req.params.id);

  if (!id) {
    res.status(400).json({ error: 'Missing id' });
    return;
  }

  try {
    const pat = patients.find(id);
    res.json(pat);
  } catch (e) {
    res.status(400).json({ error: String(e) });
    return;
  }


});

app.get('/api/patients', (_req, res) => {
  res.json(patients.get());
});

app.post('/api/patients', (req, res) => {

  try {
    const patNew = parsePatientNew(req.body);

    patients.add(patNew);
    res.json(patNew);

  } catch (e) {
    res.status(400).json({ error: `Malformed parameters: ${String(e)}` });
    return;
  }


});


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

