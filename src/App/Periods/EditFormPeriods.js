// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import FormInput from '../../components/shared/FormInput';
import {Button, Typography, message} from 'antd';
import styled from 'styled-components';
import {capitalize} from '../Utils';
import AddPositionInput from './components/AddPositionInput';
import {AppContext} from '../../contexts/AppContext';
import {POSITIONS_API, TIMELINES_API, config} from '../config';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {isEmpty} from './../Utils';
type Props = {};

const FormWrapper = styled.div`
  max-width: 480px;
`;

const initFormData = () => ({
  title: '',
  type: '',
  startEndDate: null,
  positions: [],
});

const initFormError = () => ({
  title: '',
  type: '',
  startEndDate: '',
  positions: '',
});

const regexAlphanumeric = /^[a-zA-Z0-9 ]*$/;

function AddPeriodInput(props: Props) {
  const [formData, setFormData] = React.useState(initFormData());
  const [formError, setFormError] = React.useState(initFormError());
  const [isSubmiting, setIsSubmitting] = React.useState(false);

  const {appState, dispatchApp} = React.useContext(AppContext);
  const history = useHistory();
  const {id} = useParams();

  React.useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const response = await axios.get(TIMELINES_API.getSingle(id));
          const result = response.data;

          const {title, type, startDate, endDate, positions} = result.data;
          setFormData((state) => ({
            ...state,
            title,
            type,
            startEndDate: [moment(startDate), moment(endDate)],
            positions: positions,
          }));
        } catch (error) {
          message.error('Terjadi error ketika memuat data');
        }
      };

      getData();
    }
  }, [id]);

  const handleFetchPositions = async () => {
    dispatchApp({type: 'FETCH_POSITIONS_INIT'});

    try {
      const response = await axios.get(POSITIONS_API.getAll);
      const result = response.data;

      if (result.success) {
        dispatchApp({
          type: 'FETCH_POSITIONS_SUCCESS',
          payload: {positions: result.data},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: 'FETCH_POSITIONS_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  React.useEffect(
    () => {
      handleFetchPositions();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const validate = () => {
    setFormError(initFormError());
    let isValid = true;

    if (isEmpty(formData.title)) {
      setFormError((state) => ({
        ...state,
        title: 'Judul tidak boleh kosong',
      }));
      isValid = false;
    }

    if (isEmpty(formData.type)) {
      setFormError((state) => ({
        ...state,
        type: 'Jenis tidak boleh kosong',
      }));
      isValid = false;
    }

    if (!formData.startEndDate) {
      setFormError((state) => ({
        ...state,
        startEndDate: 'Tanggal tidak boleh kosong',
      }));
      isValid = false;
    }

    if (formData.positions.length === 0) {
      setFormError((state) => ({
        ...state,
        positions: 'Posisi tidak boleh kosong',
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleChangeInput = (event: SyntheticInputEvent<>) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    if (regexAlphanumeric.test(value)) {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const handleChangeStartEndDate = (date, dateString) => {
    setFormData((state) => ({
      ...state,
      startEndDate: date,
    }));
  };

  const handleSubmit = async (timeLine: any, isEdit: boolean) => {
    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const URL = id ? TIMELINES_API.update(id) : TIMELINES_API.post;
      const method = id ? 'put' : 'post';

      const {title, type, startEndDate, positions} = formData;
      let data = {
        title,
        type,
        positions,
        startDate: startEndDate[0],
        endDate: startEndDate[1],
        forms: ['forms'],
      };

      const response = await axios[method](URL, data, {
        headers: config.headerConfig,
      });

      const result = response.data;

      if (result.success) {
        message.success(
          `Data telah berhasil ${id ? 'diperbarui' : 'ditambahkan'}`
        );
        history.push('/periods');
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      if (error.response) {
      } else {
        console.log('ℹ️ error:=');

        message.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const editedPositions = formData.positions;

  return (
    <React.Fragment>
      <Header
        title={`${id ? 'Edit' : 'Tambah'} Periode Baru`}
        hasBack
        config={{
          path: '/periods',
        }}
        rightContent={
          <Button
            disabled={isSubmiting}
            size="large"
            type="primary"
            onClick={handleSubmit}>
            {id ? 'Update' : 'Simpan'}
          </Button>
        }
      />

      <FormWrapper>
        <View marginY={16}>
          <FormInput
            name="title"
            config={{
              allowClear: true,
            }}
            isRequired
            label="Judul"
            value={formData.title}
            error={formError.title}
            onChange={handleChangeInput}
          />
        </View>

        <View marginBottom={16}>
          <FormInput
            name="type"
            config={{
              allowClear: true,
            }}
            isRequired
            label="Jenis"
            value={capitalize(formData.type)}
            error={formError.type}
            onChange={handleChangeInput}
          />
          <View marginTop={8}>
            <Typography.Paragraph>
              <Typography.Text type="secondary">
                Saran pengisian:{' '}
              </Typography.Text>
              <Button
                type="dashed"
                size="small"
                onClick={() =>
                  setFormData((state) => ({
                    ...state,
                    type: 'STAFF',
                  }))
                }>
                Staff
              </Button>
              <Button
                type="dashed"
                size="small"
                onClick={() =>
                  setFormData((state) => ({
                    ...state,
                    type: 'DOSEN',
                  }))
                }>
                Dosen
              </Button>
            </Typography.Paragraph>
          </View>
        </View>

        <View marginBottom={16}>
          <FormInput
            inputProps={{
              type: 'date-range',
            }}
            isRequired
            label="Tanggal Mulai dan Berakhir"
            value={formData.startEndDate}
            error={formError.startEndDate}
            onChange={handleChangeStartEndDate}
          />
        </View>

        {id ? (
          <View />
        ) : (
          <View marginBottom={16}>
            <AddPositionInput
              positions={editedPositions}
              data={{
                positionsData: appState.positions,
              }}
              defaultPosition={
                formData.title !== '' ? formData.positions : false
              }
              addData={(dataPositions) => {
                setFormData((state) => ({
                  ...state,
                  positions: dataPositions,
                }));
              }}
            />
            {formError.positions && (
              <View>
                <Typography.Text type="danger">
                  {formError.positions}
                </Typography.Text>
              </View>
            )}
          </View>
        )}
      </FormWrapper>
    </React.Fragment>
  );
}

export default AddPeriodInput;
