


export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string,
    };
}
interface HospitalEntryDischarge {
    date: string;
    criteria: string;
}
export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: HospitalEntryDischarge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type BaseEntryNew = Omit<BaseEntry, 'id'>;
export type HospitalEntryNew = Omit<HospitalEntry, 'id'>;
export type OccupationalHealthcareEntryNew = Omit<OccupationalHealthcareEntry, 'id'>;
export type HealthCheckEntryNew = Omit<HealthCheckEntry, 'id'>;
export type EntryNew = Omit<Entry, "id">;

export interface PatientFull {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type Patient = Omit<PatientFull, 'ssn' | 'entries'>;
export type PatientNew = Omit<PatientFull, 'id' | 'entries'>;
