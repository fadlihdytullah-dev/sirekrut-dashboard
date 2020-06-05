// @flow
import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import {Typography, Radio, Button, Switch, Avatar, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import FormInput from '../../components/shared/FormInput';
import axios from 'axios';
import {FORM_CONF_API, config} from '../config';

type Props = {};

const styles = {
  labelContainer: {
    width: '150px',
  },
};

const FormWrapper = styled.div`
  width: 600px;
`;

const FormElement = (props) => (
  <View
    flexJustifyContent="space-between"
    flexAlignItems="center"
    marginBottom={16}>
    {props.children}
  </View>
);

function AdministrationFormPage(props: Props) {
  const initFormConf = () => ({
    show360: null,
    showToefl: null,
  });
  const [formConf, setFormConf] = React.useState(initFormConf());
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const handleFetchFormConfig = async () => {
    try {
      const response = await axios.get(FORM_CONF_API.getConfig);
      const result = response.data;
      if (result.success) {
        setFormConf((state) => ({
          ...state,
          ...result.data,
        }));
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const URL = FORM_CONF_API.update;
      const method = 'put';

      const response = await axios[method](URL, formConf, {
        headers: config.headerConfig,
      });

      const result = response.data;

      if (result.success) {
        message.success(`Data telah berhasil diperbarui`);
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

  React.useEffect(() => {
    handleFetchFormConfig();
  }, []);

  return (
    <React.Fragment>
      <Header
        title="Formulir Administrasi"
        rightContent={
          <Button
            // disabled={appState.loading}
            size="large"
            type="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            // onClick={handleClickAddNew}
          >
            Simpan
          </Button>
        }
      />
      <View flex={1} marginTop={24}>
        <FormWrapper>
          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Nama Lengkap</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Email</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Alamat</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Asal</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Tanggal Lahir</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Jenis Kelamin</Typography.Text>
            </View>
            <View flex={1} flexJustifyContent="flex-start">
              <Radio checked={true} disabled>
                Laki-laki
              </Radio>
              <Radio disabled>Perempuan</Radio>
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Telepon</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Pendidikan Terakhir</Typography.Text>
            </View>
            <View flex={1}>
              <FormInput disabled />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Nilai TOEFL</Typography.Text>
            </View>
            <View flex={1} flexDirection="column">
              <FormInput
                disabled
                error="* Nilai berdasarkan TOEFL/IELTS Telkom"
              />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Buktu TOEFL</Typography.Text>
            </View>
            <View flex={1} flexDirection="column">
              <View>
                <Button disabled>Upload</Button>
              </View>
              <Typography.Text type="danger">
                * Hanya menerima sertifikat TOEFL/IELTS Telkom
              </Typography.Text>
            </View>
            <View>
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                checked={formConf.showToefl ? true : false}
                onChange={(data, e) => {
                  setFormConf((state) => ({
                    ...state,
                    showToefl: data,
                  }));
                }}
              />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Nilai Tes 360</Typography.Text>
            </View>
            <View flex={1} flexDirection="column">
              <FormInput disabled error="* Jika ada" />
            </View>
          </FormElement>

          <FormElement>
            <View style={styles.labelContainer}>
              <Typography.Text>Buktu Tes 360</Typography.Text>
            </View>
            <View flex={1} flexDirection="column">
              <View>
                <Button disabled>Upload</Button>
              </View>
              <Typography.Text type="danger">* Jika ada</Typography.Text>
            </View>
            <View>
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                checked={formConf.show360}
                onChange={(data, e) => {
                  setFormConf((state) => ({
                    ...state,
                    show360: data,
                  }));
                }}
              />
            </View>
          </FormElement>

          <View flexJustifyContent="center" marginY={32}>
            <Button type="dashed" block>
              Tambah field baru
            </Button>
          </View>
        </FormWrapper>
        <View marginLeft={32}>
          <View flexDirection="column" style={{width: '150'}}>
            <Avatar icon={<UserOutlined />} shape="square" size={150} />
            <View marginTop={8}>
              <Button disabled block>
                Upload Photo
              </Button>
            </View>
          </View>

          <View
            style={{width: '150px'}}
            flexDirection="column"
            marginTop={16}
            flexAlignItems="center">
            <Typography.Text>Dokumen Lainnya</Typography.Text>
            <Button disabled block>
              Upload CV
            </Button>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

export default AdministrationFormPage;
