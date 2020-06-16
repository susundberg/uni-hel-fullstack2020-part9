


export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface PatientFull {
   id: string;
   name: string;
   dateOfBirth: string;
   ssn: string;
   gender: Gender;
   occupation: string;
}

export type Patient = Omit<PatientFull, 'ssn'>;
export type PatientNew = Omit<PatientFull, 'id' >;