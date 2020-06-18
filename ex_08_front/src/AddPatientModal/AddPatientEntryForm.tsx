import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectFieldRating, OptionField, DiagnosisSelection } from "./FormField"; // DiagnosisSelection
import {
  HealthCheckRating,
  HealthCheckEntry
} from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: PatientEntryFormValues) => void;
  onCancel: () => void;
}

const HealthFields: OptionField<HealthCheckRating>[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
];

export const AddPatientEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnoses }] = useStateValue();


  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        type: "HealthCheck"
      }}
      onSubmit={onSubmit}
      validate={values => {
        console.log("Call validate:", values );
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="yyyy-mm-dd"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)} />

            <SelectFieldRating
              label="Health rating"
              name="healthCheckRating"
              options={HealthFields}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntryForm;
