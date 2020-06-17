import { State } from "./state";
import { Patient, Diagnose } from "../types";


export enum ActionType {
  SET_PATIENT_LIST,
  ADD_PATIENT,
  SET_DIAGNOSTIC_LIST,
}

export type ActionSetPatientList = {
  type: ActionType.SET_PATIENT_LIST;
  payload: Patient[];
};

export type ActionAddPatient = {
  type: ActionType.ADD_PATIENT;
  payload: Patient;
};

export type ActionSetDiagnoseList = {
  type: ActionType.SET_DIAGNOSTIC_LIST;
  payload: Diagnose[];
};

export type Action = ActionSetPatientList | ActionAddPatient | ActionSetDiagnoseList;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case ActionType.SET_DIAGNOSTIC_LIST:
      console.log("Set diagnoses reducer!");
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diag) => ({ ...memo, [diag.code]: diag }),
            {}
          ),
          ...state.patients
        }
      };
    case ActionType.ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
