/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, PatientNew } from '../src/types';

const parseString = (input: any): string => {
    if (typeof input !== 'string')
        throw new Error(`Not valid string: ${String(input)}`);

    return String(input);
};


const parseGender = (input: any): Gender => {

    if (Object.values(Gender).includes(input))
        return input as Gender;

    throw new Error(`Not valid gender: ${String(input)}`);

};

const parsePatientNew = (item: any): PatientNew => {

    const name = parseString(item.name);
    const ssn = parseString(item.ssn);
    const dateOfBirth = parseString(item.dateOfBirth);
    const occupation = parseString(item.occupation);
    const gender = parseGender(item.gender);

    return { name, ssn, dateOfBirth, occupation, gender };

};


export  {
    parseString,
    parseGender,
    parsePatientNew
};