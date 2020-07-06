// @flow
import * as React from 'react';
import {config} from '../../config';
import {Modal, Button} from 'antd';
import {isEmpty} from '../../Utils';
import View from '../../../components/shared/View';
import FormInput from '../../../components/shared/FormInput';
import FormInputSelect from '../../../components/shared/FormInputSelect';

type Props = {
  visible: boolean,
  studyProgram: any,
  isSubmitting: boolean,
  onSubmit: (studyProgram: any, isEdit: boolean) => Promise<void>,
  onClose: () => void,
};

const regexTitle = /^[a-zA-Z0-9 ]*$/;

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
  }, [studyProgram, visible]);

  React.useEffect(() => {
    if (studyProgram) {
      setName(studyProgram.name);
      setDegree(studyProgram.degree);
    }
  }, [studyProgram]);

  const handleChangeName = (event: SyntheticInputEvent<>) => {
    const value = event && event.target.value;
    if (regexTitle.test(value)) {
      setName(value);
    }
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

    let data = {
      name,
      degree,
    };

    if (studyProgram) {
      data = {
        ...data,
        id: studyProgram.id,
      };
    }

    onSubmit(data, isEdit);
  };

  const handleClose = () => onClose();

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title={`${studyProgram ? 'Edit' : 'Tambah'} Program Studi`}
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
