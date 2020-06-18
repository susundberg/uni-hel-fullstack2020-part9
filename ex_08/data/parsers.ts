/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Gender, PatientNew,
    HospitalEntryNew, OccupationalHealthcareEntryNew, HealthCheckRating, HealthCheckEntryNew, BaseEntryNew, EntryNew
} from '../src/types';




const parseString = (input: any): string => {
    if (typeof input !== 'string')
        throw new Error(`Not valid string: ${String(input)}`);

    return String(input);
};

const parseStringArray = (input: any): Array<string> => {
    if (!Array.isArray(input))
        throw new Error(`Not valid array: ${String(input)}`);

    return input.map((x) => parseString(x));
};

const parseGender = (input: any): Gender => {

    if (Object.values(Gender).includes(input))
        return input as Gender;

    throw new Error(`Not valid gender: ${String(input)}`);

};

const parseHealthCheckRating = (input: any): HealthCheckRating => {

    if (Object.values(HealthCheckRating).includes(input))
        return input as HealthCheckRating;

    throw new Error(`Not valid HealthCheckRating: ${String(input)}`);

};


const parsePatientNew = (item: any): PatientNew => {

    console.log("Try parse", item );
    const name = parseString(item.name);
    const ssn = parseString(item.ssn);
    const dateOfBirth = parseString(item.dateOfBirth);
    const occupation = parseString(item.occupation);
    const gender = parseGender(item.gender);
    return { name, ssn, dateOfBirth, occupation, gender };

};

const parseEntryBaseNew = (item: any): BaseEntryNew => {
    const description = parseString(item.description);
    const date = parseString(item.date);
    const specialist = parseString(item.specialist);


    if (item.diagnosisCodes) {
        const diagnosisCodes = parseStringArray(item.diagnosisCodes);
        return { description, date, specialist, diagnosisCodes };
    }
    return { description, date, specialist };
};

const parseHealthCheckEntryNew = (item: any): HealthCheckEntryNew => {
    const base = parseEntryBaseNew(item) as HealthCheckEntryNew;
    base.type = "HealthCheck";
    base.healthCheckRating = parseHealthCheckRating(item.healthCheckRating);
    return base;
};

const parseHospitalEntryNew = (item: any): HospitalEntryNew => {
    const base = parseEntryBaseNew(item) as HospitalEntryNew;
    base.type = "Hospital";

    if (!item.discharge)
        throw new Error("Item is missing 'discharge' field!");

    const criteria = parseString(item.discharge.criteria);
    const date = parseString(item.discharge.date);
    base.discharge = { criteria, date };

    return base;
};

const parseOccupationalHealthcareEntryNew = (item: any): OccupationalHealthcareEntryNew => {
    const base = parseEntryBaseNew(item) as OccupationalHealthcareEntryNew;
    base.type = "OccupationalHealthcare";
    base.employerName = parseString(item.employerName);
    if (item.sickLeave) {
        const startDate = parseString(item.startDate);
        const endDate = parseString(item.endDate);
        base.sickLeave = { startDate, endDate };
    }
    return base;
};

const parseEntryNew = (item: any): EntryNew => {
    console.log("Parse entry", item );
    switch (item.type) {
        case "Hospital":
            return parseHospitalEntryNew(item);
        case "OccupationalHealthcare":
            return parseOccupationalHealthcareEntryNew(item);
        case "HealthCheck":
            return parseHealthCheckEntryNew(item);
        default:
            throw Error(`Item 'type' invalid: ${String(item.type)}`);
    }
};

export {
    parseString,
    parseGender,
    parsePatientNew,
    parseEntryNew
};