
import { ActionType, ActionSetPatientList, ActionAddPatient, ActionSetDiagnoseList } from './reducer';
import { Patient, Diagnose } from '../types';


export const setPatientList = (patients: Patient[]): ActionSetPatientList => (

    { type: ActionType.SET_PATIENT_LIST, payload: patients }
);

export const setDiagnoseList = (diagnoses: Diagnose[]): ActionSetDiagnoseList => (

    { type: ActionType.SET_DIAGNOSTIC_LIST, payload: diagnoses }
);


export const addPatient = (pat: Patient): ActionAddPatient => (
    { type: ActionType.ADD_PATIENT, payload: pat }
);
