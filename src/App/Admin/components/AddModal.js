// @flow
import * as React from 'react';
import {Modal, Button} from 'antd';
import {isEmpty} from '../../Utils';
import View from '../../../components/shared/View';
import FormInput from '../../../components/shared/FormInput';

type Props = {
  visible: boolean,
  admin: any,
  isSubmitting: boolean,
  onSubmit: (data: any) => Promise<void>,
  onClose: () => void,
};

const regexPhone = /^[0-9]*$/;
const regexName = /^[a-zA-Z ]*$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const initFormData = () => ({
  nip: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const initFormError = () => ({
  nip: '',
  name: '',
  email: '',
  password: '',
});

function AddModal({visible, isSubmitting, admin, onSubmit, onClose}: Props) {
  const [formData, setFormData] = React.useState(initFormData);
  const [formError, setFormError] = React.useState(initFormError());

  const handleChangeInput = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleChangeName = (event) => {
    const value = event.target && event.target.value;

    if (regexName.test(value)) {
      setFormData((state) => ({
        ...state,
        name: value,
      }));
    }
  };

  const handleChangeNIP = (event) => {
    const value = event.target && event.target.value;

    if (regexPhone.test(value)) {
      setFormData((state) => ({
        ...state,
        nip: value,
      }));
    }
  };

  const handleChangeEmail = (event) => {
    const value = event.target && event.target.value;

    setFormData((state) => ({
      ...state,
      email: value,
    }));
  };

  const validate = () => {
    setFormError(initFormError());

    let isValid = true;

    const {nip, name, email, password, confirmPassword} = formData;

    if (isEmpty(nip)) {
      setFormError((state) => ({
        ...state,
        nip: 'NIP tidak boleh kosong',
      }));
      isValid = false;
    }

    if (isEmpty(name)) {
      setFormError((state) => ({
        ...state,
        name: 'Nama tidak boleh kosong',
      }));
      isValid = false;
    }

    if (!regexEmail.test(email)) {
      setFormError((state) => ({
        ...state,
        email: 'Email tidak valid',
      }));
      isValid = false;
    }

    if (isEmpty(email)) {
      setFormError((state) => ({
        ...state,
        email: 'Email tidak boleh kosong',
      }));
      isValid = false;
    }

    if (isEmpty(password) || isEmpty(confirmPassword)) {
      setFormError((state) => ({
        ...state,
        password: 'Password tidak boleh kosong',
      }));
      isValid = false;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setFormError((state) => ({
        ...state,
        password: 'Password minimal 6 karakter',
      }));
      isValid = false;
    }

    if (password !== confirmPassword) {
      setFormError((state) => ({
        ...state,
        password: 'Password dan Konfirmasi password tidak sama',
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

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
          htmlType="submit"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}>
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
          error={formError.nip}
          onChange={handleChangeNIP}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          isRequired
          label="Nama"
          name="name"
          value={formData.name}
          error={formError.name}
          onChange={handleChangeName}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          inputProps={{
            type: 'email',
          }}
          isRequired
          label="Email"
          name="email"
          value={formData.email}
          error={formError.email}
          onChange={handleChangeEmail}
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
          onChange={handleChangeInput}
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
          error={formError.password}
          onChange={handleChangeInput}
        />
      </View>
    </Modal>
  );
}

export default AddModal;
