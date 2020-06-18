import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, HealthCheckRating } from "../types";

// structure of a single option
export type OptionField<T> = {
  value: T;
  label: string;
};


// props for select field component
type SelectFieldProps<T> = {
  name: string;
  label: string;
  options: OptionField<T>[];
};

// function SelectField<T>(arg: string): T {
//   return arg;
// }

// type ReactFcWrapper<T> = React.FC<SelectFieldProps<T>>;

function SelectField<T>({ name, label, options }: SelectFieldProps<T>) {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
}

export const SelectFieldGender: React.FC<SelectFieldProps<Gender>> = (props: SelectFieldProps<Gender>) =>
  (SelectField<Gender>(props));

export const SelectFieldRating: React.FC<SelectFieldProps<HealthCheckRating>> = (props: SelectFieldProps<HealthCheckRating>) =>
  (SelectField<HealthCheckRating>(props));

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
export const FOO = () => {
  return "foo";
};

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
