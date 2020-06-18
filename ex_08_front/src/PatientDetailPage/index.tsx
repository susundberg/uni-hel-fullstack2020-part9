import React from "react";
import axios from "axios";
import { Container, Icon, List, Button } from "semantic-ui-react";

import { PatientEntryFormValues } from "../AddPatientModal/AddPatientEntryForm";
import { AddPatientEntryModal } from "../AddPatientModal";

import { useStateValue } from "../state";
import {
    Patient, Gender,
    Entry
} from "../types";
import { apiBaseUrl } from "../constants";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    const [{ diagnoses }] = useStateValue();

    let icon: "hospital symbol" | "doctor" | "talk";
    const details = [];
    let diagnosesInfo = <div> No diagnoses </div>;

    console.log("RENDER ENTRY:", entry );

    switch (entry.type) {
        case "Hospital":
            icon = "hospital symbol";
            details.push(<p key="disc"> Discharged: {entry.discharge.criteria} at {entry.discharge.date} </p>);
            break;
        case "OccupationalHealthcare":
            icon = "doctor";
            details.push(<p key="emp"> Employer: {entry.employerName}  </p>);
            if (entry.sickLeave) {
                details.push(<p key="sickleave"> Sickleave: {entry.sickLeave.startDate} -   {entry.sickLeave.endDate} </p>);
            }
            else {
                details.push(<p key="sickleave"> Sickleave: No sickleave </p>);
            }
            break;
        case "HealthCheck":
            icon = "talk";
            details.push(<p key="rating"> Rating: {entry.healthCheckRating} </p>);
            break;
        default:
            return assertNever(entry);
    }


    console.log("Diagnos", diagnoses);

    if (entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
        diagnosesInfo =
            <ul>
                {entry.diagnosisCodes.map((x) => {
                    console.log(x);
                    if (!diagnoses[x])
                        return (<li key={x}> {x} </li>);

                    const latin = diagnoses[x]?.latin;
                    return (<li key={x}> {x}: {diagnoses[x].name} {latin && `- Latin: ${latin}`}</li>);
                })
                }
            </ul>;

    }
    return (<List.Item>
        <h4> {entry.date} <Icon name={icon} /> </h4>
        <div> Description: {entry.description}</div>
        <div> Specialist: {entry.specialist}</div>
        <div> Diagnose: {diagnosesInfo} </div>
        {details}
    </List.Item>);

};

const PatientDetailPage: React.FC<{ patientID: string }> = ({ patientID }) => {
    const [patient, setPatient] = React.useState<Patient>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
        console.log("Try update", patient);
        console.log("With: ", values);

        if (!patient)
            return;

        try {
            const { data: newPat } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                values
            );
            setPatient( newPat );
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };


    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientID}`);
                console.log("Set patient:", patientData);
                setPatient(patientData);
            } catch (e) {
                console.error(e.response.data);
            }
        };


        fetchPatient();

    }, [patientID]);


    if (!patient) {
        return (<div>Loading...</div>);
    }




    const iconName = (x: Gender): "venus" | "mars" | "genderless" => {
        switch (x) {
            case Gender.Female:
                return "venus";
            case Gender.Male:
                return "mars";
            default:
                return "genderless";
        }
    };

    return (
        <div className="App">
            <Container textAlign="left">
                <h3> {patient.name} <Icon name={iconName(patient.gender)} /> </h3>


            </Container>
            <Container textAlign="left">
                <p> SSN: {patient.ssn}</p>
                <p> Birth: {patient.dateOfBirth}</p>
                <p> Occupation: {patient.occupation}</p>

                <h4> Entries: </h4>
                <List celled>
                    {patient.entries.map((entry) => (<EntryDetails key={entry.id} entry={entry} />))}
                </List>


            </Container>

            <AddPatientEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatientEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add new entry</Button>

        </div>
    );
};

export default PatientDetailPage;
