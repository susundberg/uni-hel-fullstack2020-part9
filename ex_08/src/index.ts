import express from 'express';
import cors from 'cors';
import config from './config';
import patients from '../data/patients';
import diagnoses from '../data/diagnoses';
import { parsePatientNew, parseEntryNew } from '../data/parsers';
import { PatientFull } from './types';

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


const findPatientById = (id: string): PatientFull => {

  if (!id) {
    throw new Error("Patient ID missing");
  }

  try {
    return patients.find(id);
  }
  catch (e) {
    throw new Error("Cannot find patient ID");
  }

};


app.post('/api/patients/:id/entries', (req, res) => {
  let pat;

  try {
    pat = findPatientById(String(req.params.id));
  } catch (e) {
    res.status(404).json({ error: "Patient find: " + String(e) });
    return;
  }

  try {
    const entryNew = parseEntryNew(req.body);
    const patNew = patients.addEntry( pat, entryNew );
    res.json( patNew );
  }
  catch (e) {
    res.status(400).json({ error: "Entry create: " + String(e) });
    return;
  }


});

app.get('/api/patients/:id', (req, res) => {
  try {
    const pat = findPatientById(String(req.params.id));
    res.json(pat);
  } catch (e) {
    res.status(404).json({ error: String(e) });
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

