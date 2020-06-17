import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";



import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetailPage: React.FC<{ patientID: string }> = ({ patientID }) => {


    const [patient, setPatient] = React.useState<Patient>();


    React.useEffect(() => {
        const fetchDetail = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientID}`);
                console.log("Set patient:", patientData);
                setPatient(patientData);
            } catch (e) {
                console.error(e.response.data);
            }
        };
        fetchDetail();
    }, [patientID]);


    if (!patient) {
        return (<div>Loading...</div>);
    }



    
    const iconName = (x: Gender): "venus"|"mars"|"genderless" => {
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
            </Container>

        </div>
    );
};

export default PatientDetailPage;
