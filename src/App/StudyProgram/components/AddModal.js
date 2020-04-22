// @flow
import * as React from 'react';

import type {StudyProgramType} from './../../../types/App.flow';

import {Modal, Button} from 'antd';
import FormInput from '../../../components/shared/FormInput';
import FormInputSelect from '../../../components/shared/FormInputSelect';
import View from '../../../components/shared/View';
import {config} from '../../config';
import {isEmpty} from '../../Utils';

type Props = {
  visible: boolean,
  studyProgram: any,
  isSubmitting: boolean,
  onSubmit: (studyProgram: any, isEdit: boolean) => Promise<void>,
  onClose: () => void,
};

// const buildStudyProgram = (
//   studyProgram: StudyProgramType
// ): {degree: string, name: string} => {
//   // S1 Teknik Informatika
//   const chunks = studyProgram.name.split(' '); // [S1, Teknik, Informatika]
//   let degree = chunks[0];
//   const name = chunks.splice(1).join(' ');

//   if (degree === 'D3') {
//     degree = 'DIPLOMA';
//   } else if (degree === 'S1') {
//     degree = 'SARJANA';
//   } else if (degree === 'S2') {
//     degree = 'MAGISTER';
//   } else if (degree === 'S3') {
//     degree = 'DOKTOR';
//   }

//   return {
//     degree,
//     name,
//   };
// };

function AddModal({
  visible,
  studyProgram,
  isSubmitting,
  onSubmit,
  onClose,
}: Props) {
  const [name, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState('');

  const [degree, setDegree] = React.useState('');
  const [errorDegree, setErrorDegree] = React.useState('');

  React.useEffect(() => {
    resetError();
    resetState();
  }, [studyProgram]);

  React.useEffect(() => {
    if (studyProgram) {
      setName(studyProgram.name);
      setDegree(studyProgram.degree);
    }
  }, [studyProgram]);

  const handleChangeName = (event: SyntheticInputEvent<>) => {
    setName(event && event.target.value);
  };

  const handleChangeDegree = (value: string) => {
    setDegree(value);
  };

  const validation = () => {
    let isValid = true;

    resetError();

    if (isEmpty(name)) {
      setErrorName('Nama tidak boleh kosong');

      isValid = false;
    }

    if (isEmpty(degree)) {
      setErrorDegree('Degree tidak boleh kosong');

      isValid = false;
    }

    return isValid;
  };

  const resetError = () => {
    setErrorName('');
    setErrorDegree('');
  };

  const resetState = () => {
    setName('');
    setDegree('');
  };

  const handleSubmit = () => {
    if (!validation()) {
      return;
    }

    const isEdit = !!studyProgram;

    const data = {
      name,
      degree,
    };

    if (studyProgram) {
      data.id = studyProgram.id;
    }

    onSubmit(data, isEdit);
  };

  const handleClose = () => onClose();

  return (
    <Modal
      visible={visible}
      title="Tambah Program Studi"
      okText="Submit"
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={isSubmitting}
          onClick={handleSubmit}>
          {studyProgram ? 'Update' : 'Submit'}
        </Button>,
      ]}
      closable={!isSubmitting}
      onCancel={handleClose}
      confirmLoading={isSubmitting}>
      <View marginBottom={16}>
        <FormInputSelect
          isRequired
          label="Strata"
          options={config.app.strataOptions}
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

export default AddModal;
