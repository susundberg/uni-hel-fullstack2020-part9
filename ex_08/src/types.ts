


export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export type Gender = 'male' | 'female' | 'other';

export interface PatientFull {
   id: string;
   name: string;
   dateOfBirth: string;
   ssn: string;
   gender: Gender;
   occupation: string;
}

export type Patient = Omit<PatientFull, 'ssn'>;

