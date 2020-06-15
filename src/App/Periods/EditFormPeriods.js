// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import moment from 'moment';
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
type Props = {};

const FormWrapper = styled.div`
  max-width: 480px;
`;

const initFormData = () => ({
  title: '',
  type: '',
  startDate: null,
  endDate: null,
  forms: ['C4UtF8dpfjuPOi6FmZ7L'],
  positions: [],
  prePositions: [],
  isAllPositions: false,
});

const initFormError = () => ({
  title: '',
  type: '',
  startDate: '',
  endDate: '',
  forms: '',
  positions: '',
});

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
          // dispatchApp({type: 'FETCH_TIMELINES_INIT'});

          const response = await axios.get(TIMELINES_API.getSingle(id));
          const result = response.data;

          const {title, type, startDate, endDate, positions} = result.data;
          setFormData((state) => ({
            ...state,
            title,
            type,
            startDate: moment(startDate),
            endDate: moment(endDate),
            positions: positions,
          }));

          console.log('ℹ️ result:=', result);

          // if (result.success) {
          //   console.log(result.data, 'TRASDSADSADSAD');
          //   dispatchApp({
          //     type: 'FETCH_TIMELINES_SUCCESS',
          //     payload: {dataTimelines: result.data},
          //   });
          // } else {
          //   throw new Error(result.errors);
          // }
        } catch (error) {
          message.error('Terjadi error ketika memuat data');

          // dispatchApp({
          //   type: 'FETCH_TIMELINES_FAILURE',
          //   payload: {error: error.message},
          // });
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

  const handleChangeInput = (event: SyntheticInputEvent<>) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleChangeStartDate = (date, dateString) => {
    console.log('ℹ️ date & dateString:=', date, dateString);
    setFormData((state) => ({
      ...state,
      startDate: date,
    }));
  };

  const handleChangeEndDate = (date, dateString) => {
    console.log('ℹ️ date & dateString:=', date, dateString);
    setFormData((state) => ({
      ...state,
      endDate: date,
    }));
  };

  const handleChangePosition = (data) => {
    console.log(data, 'ASDSAKNDJSANDDKJSAIn');
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  const handleSubmit = async (timeLine: any, isEdit: boolean) => {
    try {
      setIsSubmitting(true);
      const URL = id ? TIMELINES_API.update(id) : TIMELINES_API.post;
      const method = id ? 'put' : 'post';

      const response = await axios[method](URL, formData, {
        headers: config.headerConfig,
      });

      const result = response.data;

      if (result.success) {
        message.success(
          `Data telah berhasil ${id ? 'diperbarui' : 'ditambahkan'}`
        );
        history.push('/periods');
        // handleFetchStudyPrograms();
        // setShowModal(false);
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.errors);
      } else {
        message.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log('ℹ️ formData:=', formData);

  const editedPositions = formData.positions;

  return (
    <React.Fragment>
      <Header
        title="Tambah Periode Baru"
        hasBack
        config={{
          path: '/periods',
        }}
        rightContent={
          <Button
            // disabled={appState.loading}
            size="large"
            type="primary"
            onClick={handleSubmit}>
            Simpan
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
              type: 'date',
            }}
            isRequired
            label="Tanggal mulai"
            value={formData.startDate}
            error={formError.startDate}
            onChange={handleChangeStartDate}
          />
        </View>

        <View marginBottom={16}>
          <FormInput
            inputProps={{
              type: 'date',
            }}
            isRequired
            showToday={false}
            label="Tanggal berakhir"
            value={formData.endDate}
            error={formError.endDate}
            onChange={handleChangeEndDate}
          />
        </View>

        <View marginBottom={16}>
          <AddPositionInput
            positions={editedPositions}
            data={{
              positionsData: appState.positions,
            }}
            addData={(dataPositions) => {
              console.log(dataPositions, 'INI DATAPOSITIOn');
              setFormData((state) => ({
                ...state,
                positions: dataPositions,
              }));
            }}
          />
        </View>
      </FormWrapper>
    </React.Fragment>
  );
}

export default AddPeriodInput;
