import { State } from "./state";
import { Patient } from "../types";


export enum ActionType {
  SET_PATIENT_LIST,
  ADD_PATIENT
}

export type ActionSetPatientList = {
  type: ActionType.SET_PATIENT_LIST;
  payload: Patient[];
};

export type ActionAddPatient = {
  type: ActionType.ADD_PATIENT;
  payload: Patient;
};

export type Action = ActionSetPatientList | ActionAddPatient;

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
