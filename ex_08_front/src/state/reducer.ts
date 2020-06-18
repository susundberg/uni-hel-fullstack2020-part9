import { State } from "./state";
import { Patient, Diagnose } from "../types";


export enum ActionType {
  SET_PATIENT_LIST,
  ADD_PATIENT,
  SET_DIAGNOSTIC_LIST,
  ADD_PATIENT_ENTRY
}

export type ActionSetPatientList = {
  type: ActionType.SET_PATIENT_LIST;
  payload: Patient[];
};

export type ActionAddPatient = {
  type: ActionType.ADD_PATIENT;
  payload: Patient;
};

// We dont really need this, as we are storing PUBLIC patient data, that does not have entry field.
// export type ActionAddPatientEntry = {
//   type: ActionType.ADD_PATIENT_ENTRY;
//   payload: [string,Entry];
// };

export type ActionSetDiagnoseList = {
  type: ActionType.SET_DIAGNOSTIC_LIST;
  payload: Diagnose[];
};

export type Action = ActionSetPatientList | ActionAddPatient | ActionSetDiagnoseList ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_PATIENT_LIST:
      console.log("Set patients:", action.payload);
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
    // case ActionType.ADD_PATIENT_ENTRY:
    //   const newPatient = {...state.patients[action.payload[0]]};
    //   newPatient.entries = newPatient.entries.concat( action.payload[1]); 
    //   return {
    //     ...state,
    //     patients: {
    //       ...state.patients,
    //       [action.payload[0]]: newPatient
    //     }
    //   };
    default:
      return state;
  }
};
