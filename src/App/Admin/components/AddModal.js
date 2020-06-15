// @flow
import * as React from 'react';
import type {StudyProgramType} from './../../../types/App.flow';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import FormInput from '../../../components/shared/FormInput';
import FormInputSelect from '../../../components/shared/FormInputSelect';
import View from '../../../components/shared/View';
import {AUTH_API, config} from '../../config';
import {isEmpty} from '../../Utils';

type Props = {
  visible: boolean,
  admin: any,
  isSubmitting: boolean,
  onSubmit: () => void,
  onClose: () => void,
};

const initFormData = () => ({
  nip: '',

  email: '',
  password: '',
  confirmPassword: '',
});

function AddModal({visible, isSubmitting, admin, onSubmit, onClose}: Props) {
  const [formData, setFormData] = React.useState(initFormData);
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

  const handleChangeName = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const validation = () => {
    let isValid = true;

    resetError();

    if (isEmpty(formData.name)) {
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
    setFormData('');
    setDegree('');
  };

  // const handleSubmit = () => {
  //   // if (!validation()) {
  //   //   return;
  //   // }
  //   // const isEdit = !!studyProgram;
  //   // const data = {
  //   //   name,
  //   //   degree,
  //   // };
  //   // if (studyProgram) {
  //   //   data.id = studyProgram.id;
  //   // }
  //   // onSubmit(data, isEdit);
  // };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title="Tambah Admin"
      okText="Submit"
      afterClose={() => setFormData(initFormData())}
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
          name="nip"
          value={formData.nip}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          isRequired
          label="Nama"
          name="name"
          value={formData.name}
          error={errorName}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          isRequired
          label="Email"
          name="email"
          value={formData.email}
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
          value={formData.password}
          name="password"
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
          value={formData.confirmPassword}
          name="confirmPassword"
          error={errorName}
          onChange={handleChangeName}
        />
      </View>
    </Modal>
  );
}

export default AddModal;
