import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import AddPatientEntryForm, { PatientEntryFormValues } from './AddPatientEntryForm';

interface Props<T> {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  error?: string;
}

export const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props<PatientFormValues>) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props<PatientEntryFormValues>) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


