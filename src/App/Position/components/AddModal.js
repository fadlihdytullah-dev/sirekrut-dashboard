// @flow
import * as React from 'react';
import type {GraduateType} from './../../../types/App.flow';
import FormInput from './../../../components/shared/FormInput';
import FormInputSelect from './../../../components/shared/FormInputSelect';
import View from '../../../components/shared/View';
import {Modal, Button, Checkbox} from 'antd';
import {AppContext} from '../../../contexts/AppContext';
import {isEmpty, isBetween} from '../../Utils';
import {config} from '../../config';

type StudyPrograms = 'ALL' | ?Array<string>;

type Props = {
  visible: boolean,
  position: ?Object,
  isSubmitting: boolean,
  onSubmit: (position: any, isEdit: boolean) => Promise<void>,
  onClose: () => void,
};

type State = {
  name: string,
  minimumGPA: number,
  minimumGraduate: ?GraduateType,
  studyPrograms: StudyPrograms,
  isSelectedAllStudyPrograms: boolean,
  details: string,
  nip: string,
};

const startGPA = 1;
const endGPA = 4;

const initState = () => ({
  name: '',
  minimumGPA: 1,
  minimumGraduate: null,
  studyPrograms: [],
  isSelectedAllStudyPrograms: false,
  details: '',
  nip: '',
});

const initStateFormError = () => ({
  name: '',
  minimumGPA: '',
  minimumGraduate: '',
  studyPrograms: '',
  details: '',
  nip: '',
});

function AddModal({visible, position, isSubmitting, onSubmit, onClose}: Props) {
  const [formState, setFormState] = React.useState<State>(initState());

  const {appState} = React.useContext(AppContext);

  React.useEffect(() => {
    if (position) {
      const minimumGraduate = config.app.strataOptions.find(
        (item) => item.value === position.minimumGraduate
      );

      const studyPrograms = Array.isArray(position.studyPrograms)
        ? position.studyPrograms.map((item) => item.id)
        : [];

      setFormState((state) => ({
        ...state,
        name: position.name,
        minimumGPA: position.minimumGPA,
        minimumGraduate: (minimumGraduate && minimumGraduate.value) || null,
        isSelectedAllStudyPrograms: position.studyPrograms === 'ALL',
        studyPrograms: studyPrograms,
        details: position.details,
      }));
    }
  }, [position]);

  const [formError, setFormError] = React.useState(initStateFormError());

  const validation = () => {
    const {
      name,
      minimumGPA,
      minimumGraduate,
      studyPrograms,
      isSelectedAllStudyPrograms,
    } = formState;

    let isValid = true;
    setFormError(initStateFormError());

    if (isEmpty(name)) {
      setFormError((state) => ({
        ...state,
        name: 'Nama tidak boleh kosong',
      }));

      isValid = false;
    }

    if (!isBetween(minimumGPA, startGPA, endGPA)) {
      setFormError((state) => ({
        ...state,
        minimumGPA: 'IPK harus antara 1 dan 4',
      }));

      isValid = false;
    }

    if (!minimumGraduate) {
      setFormError((state) => ({
        ...state,
        minimumGraduate: 'Minimum lulusan tidak boleh kosong',
      }));

      isValid = false;
    }

    if (
      studyPrograms &&
      studyPrograms.length === 0 &&
      isSelectedAllStudyPrograms === false
    ) {
      setFormError((state) => ({
        ...state,
        studyPrograms: 'Program studi tidak boleh kosong',
      }));

      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validation()) {
      return;
    }

    const {
      name,
      minimumGPA,
      minimumGraduate,
      details,
      isSelectedAllStudyPrograms,
      studyPrograms,
    } = formState;

    const studyProgramsExactValue = isSelectedAllStudyPrograms
      ? 'ALL'
      : studyPrograms;

    const isEdit = !!position;

    const data = {
      name,
      minimumGPA,
      minimumGraduate,
      studyPrograms: studyProgramsExactValue,
      details,
    };

    if (position) {
      data.id = position.id;
    }

    onSubmit(data, isEdit);
  };

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => resetState, [position]);

  const resetState = () => {
    setFormState(initState());
    setFormError(initStateFormError());
  };

  const handleChangeInput = (event: SyntheticInputEvent<>) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleChangeMinimumGPA = (value: number) => {
    setFormState((state) => ({
      ...state,
      minimumGPA: value,
    }));
  };

  const handleChangeDegree = (value: GraduateType) => {
    setFormState((state) => ({
      ...state,
      minimumGraduate: value,
    }));
  };

  const handleChangeSelectedStudyPrograms = (selected) => {
    setFormState((state) => ({
      ...state,
      studyPrograms: selected,
    }));
  };

  const handleToggleAllStudyProgram = () => {
    setFormState((state) => ({
      ...state,
      isSelectedAllStudyPrograms: !state.isSelectedAllStudyPrograms,
    }));
  };

  const customStudyPrograms = appState.studyPrograms.map((item) => ({
    key: item.id,
    value: item.id,
    label: item.name,
  }));

  const filteredStudyPrograms = customStudyPrograms.filter(
    (item) => !customStudyPrograms.includes(item.key)
  );

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
          {position ? 'Update' : 'Submit'}
        </Button>,
      ]}
      closable={!isSubmitting}
      onCancel={handleClose}
      confirmLoading={isSubmitting}>
      <View marginBottom={16}>
        <FormInput
          name="name"
          config={{
            allowClear: true,
          }}
          isRequired
          label="Nama"
          value={formState.name}
          error={formError.name}
          onChange={handleChangeInput}
        />
      </View>

      <View marginBottom={16}>
        <FormInput
          inputProps={{
            type: 'number',
            min: 1,
            max: 4,
          }}
          isRequired
          label="Minimum IPK"
          value={formState.minimumGPA}
          error={formError.minimumGPA}
          onChange={handleChangeMinimumGPA}
        />
      </View>

      <View marginBottom={16}>
        <FormInputSelect
          config={{
            allowClear: true,
          }}
          isRequired
          label="Minimum Lulusan"
          options={config.app.strataOptions}
          value={formState.minimumGraduate}
          error={formError.minimumGraduate}
          onChange={handleChangeDegree}
        />
      </View>

      <View marginBottom={16}>
        <FormInputSelect
          isRequired
          label="Program Studi"
          config={{allowClear: true, multiple: true}}
          options={filteredStudyPrograms}
          value={formState.studyPrograms}
          error={formError.studyPrograms}
          disabled={formState.isSelectedAllStudyPrograms}
          onChange={handleChangeSelectedStudyPrograms}
        />
        <View flexJustifyContent="flex-end" marginTop={8}>
          <Checkbox
            value="ALL"
            onChange={handleToggleAllStudyProgram}
            checked={formState.isSelectedAllStudyPrograms}>
            Semua
          </Checkbox>
        </View>
      </View>

      <View marginBottom={16}>
        <FormInput
          name="details"
          config={{
            allowClear: true,
          }}
          inputProps={{
            type: 'textarea',
          }}
          label="Details"
          value={formState.details}
          error={formError.details}
          onChange={handleChangeInput}
        />
      </View>
    </Modal>
  );
}

export default AddModal;
