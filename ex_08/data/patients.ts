import {v1} from 'uuid';

import { Patient, PatientFull, PatientNew, Gender } from '../src/types';

const ENTRIES: Array<PatientFull> = [
  {
    "id": "d2773336-f723-11e9-8f0b-362b9e155667",
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": Gender.male,
    "occupation": "New york city cop"
  },
  {
    "id": "d2773598-f723-11e9-8f0b-362b9e155667",
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": Gender.male,
    "occupation": "Cop"
  },
  {
    "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": Gender.male,
    "occupation": "Technician"
  },
  {
    "id": "d2773822-f723-11e9-8f0b-362b9e155667",
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": Gender.female,
    "occupation": "Forensic Pathologist"
  },
  {
    "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": Gender.male,
    "occupation": "Digital evangelist"
  }
];


const get = (): Array<Patient> => {
  return ENTRIES.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const add = (item: PatientNew): Array<Patient> => {

  const newItem = item as PatientFull;
 


  newItem.id = v1();
  console.log("Add item", newItem);

  ENTRIES.push(newItem);
  return get();
};


export default {
  get,
  add,
  

};
