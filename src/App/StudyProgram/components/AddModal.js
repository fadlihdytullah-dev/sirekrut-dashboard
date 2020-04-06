// @flow
import * as React from 'react';

import type {StudyProgramType} from './../../../types/App.flow';

import {Modal, Button} from 'antd';
import FormInput from '../../../components/commons/FormInput';
import FormInputSelect from '../../../components/commons/FormInputSelect';
import View from '../../../components/shared/View';

type Props = {
  selected?: ?StudyProgramType,
  onClose: () => void,
};

const STRATA_OPTIONS = [
  {
    key: 'D3',
    label: 'Diploma',
    value: 'D3',
  },
  {
    key: 'S1',
    label: 'Sarjana',
    value: 'S1',
  },
  {
    key: 'S2',
    label: 'Magister',
    value: 'S2',
  },
  {
    key: 'S3',
    label: 'Doktor',
    value: 'S3',
  },
];

const buildStudyProgram = (
  studyProgram: StudyProgramType
): {degree: string, name: string} => {
  // S1 Teknik Informatika
  const chunks = studyProgram.name.split(' '); // [S1, Teknik, Informatika]
  const degree = chunks[0];
  const name = chunks.splice(1).join(' ');

  return {
    degree,
    name,
  };
};

function AddModal({selected, onClose}: Props) {
  const studyProgram = (selected && buildStudyProgram(selected)) || null;

  const [name, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState('');

  const [degree, setDegree] = React.useState('');
  const [errorDegree, setErrorDegree] = React.useState('');

  React.useEffect(() => {
    if (studyProgram) {
      setName(studyProgram.name);
      setDegree(studyProgram.degree);
    }
  }, [studyProgram]);

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleChangeName = (event: SyntheticInputEvent<>) => {
    setName(event && event.target.value);
  };

  const handleChangeDegree = (value: string) => {
    setDegree(value);
  };

  const validateInput = () => {
    let isValid = true;

    if (name.trim().length === 0) {
      setErrorName('Nama tidak boleh kosong');
      isValid = false;
    }

    if (!degree) {
      setErrorDegree('Strata tidak boleh kosong');
      isValid = false;
    }

    return isValid;
  };

  const resetError = () => {
    setErrorName('');
    setErrorDegree('');
  };

  const handleSubmit = () => {
    if (!validateInput()) {
      return;
    }

    resetError();
    setConfirmLoading(true);

    setTimeout(() => {
      setConfirmLoading(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => onClose();

  return (
    <Modal
      visible={true}
      title="Tambah Program Studi"
      okText="Submit"
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleSubmit}>
          {studyProgram ? 'Update' : 'Submit'}
        </Button>,
      ]}
      closable={!confirmLoading}
      onCancel={handleClose}
      confirmLoading={confirmLoading}>
      <View marginBottom={16}>
        <FormInputSelect
          isRequired
          label="Strata"
          options={STRATA_OPTIONS}
          value={degree}
          error={errorDegree}
          onChange={handleChangeDegree}
        />
      </View>

      <View>
        <FormInput
          isRequired
          label="Nama"
          value={name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>
    </Modal>
  );
}

AddModal.defaultProps = {
  isVisible: false,
};

export default AddModal;
