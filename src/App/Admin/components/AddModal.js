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
  admin: any,
  isSubmitting: boolean,
  onSubmit: () => void,
  onClose: () => void,
};

function AddModal({visible, admin, isSubmitting, onSubmit, onClose}: Props) {
  const [name, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState('');

  const [degree, setDegree] = React.useState('');
  const [errorDegree, setErrorDegree] = React.useState('');

  // React.useEffect(() => {
  //   resetError();
  //   resetState();
  // }, [studyProgram, visible]);

  // React.useEffect(() => {
  //   if (studyProgram) {
  //     setName(studyProgram.name);
  //     setDegree(studyProgram.degree);
  //   }
  // }, [studyProgram]);

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
    // if (!validation()) {
    //   return;
    // }
    // const isEdit = !!studyProgram;
    // const data = {
    //   name,
    //   degree,
    // };
    // if (studyProgram) {
    //   data.id = studyProgram.id;
    // }
    // onSubmit(data, isEdit);
  };

  const handleClose = () => onClose();

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title="Tambah Admin"
      okText="Submit"
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={isSubmitting}
          onClick={handleSubmit}>
          {admin ? 'Update' : 'Submit'}
        </Button>,
      ]}
      closable={!isSubmitting}
      onCancel={handleClose}
      confirmLoading={isSubmitting}>
      <View marginBottom={16}>
        <FormInput
          isRequired
          label="NIP"
          value={name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          isRequired
          label="Nama"
          value={name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          isRequired
          label="Email"
          value={name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          inputProps={{
            type: 'password',
          }}
          isRequired
          label="Password"
          value={name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          inputProps={{
            type: 'password',
          }}
          isRequired
          label="Konfirmasi Password"
          value={name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>
    </Modal>
  );
}

export default AddModal;
