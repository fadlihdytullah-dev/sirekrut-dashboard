// @flow
import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import {Typography, Radio, Button, Switch, Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import FormInput from '../../components/shared/FormInput';

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
  return (
    <React.Fragment>
      <Header
        title="Formulir Administrasi"
        rightContent={
          <Button
            // disabled={appState.loading}
            size="large"
            type="primary"
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
              <Switch checkedChildren="On" unCheckedChildren="Off" />
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
              <Switch checkedChildren="On" unCheckedChildren="Off" />
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
