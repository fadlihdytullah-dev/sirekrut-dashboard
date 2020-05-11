// @flow
import * as React from 'react';
import {Modal, Button, Typography, Avatar} from 'antd';
import View from '../../../components/shared/View';

type Props = {
  visible: boolean,
  onClose: () => void,
};

const FieldContainer = (props: {label: string, content: string}) => (
  <View flexDirection="row" marginBottom={8}>
    <View style={{width: '150px'}} marginRight={8}>
      <Typography.Text strong>{props.label}</Typography.Text>
    </View>
    <View style={{width: '100%'}}>
      <Typography.Text>: {props.content}</Typography.Text>
    </View>
  </View>
);

function ApplicantModalDataView(props: Props) {
  return (
    <React.Fragment>
      <Modal
        width={800}
        visible={props.visible}
        title="Informasi Pelamar"
        onOk={props.onClose}
        onCancel={props.onClose}
        footer={[
          <Button key="back" onClick={props.onClose}>
            Kembali
          </Button>,
        ]}>
        <View>
          <Typography.Paragraph>
            Posisi yang di-submit:{' '}
            <Typography.Text strong>Staff IT Sisfo</Typography.Text>
          </Typography.Paragraph>
          <View flexDirection="row">
            <View style={{width: '500px'}}>
              <FieldContainer label="Nama" content="Fadli Hidayatullah" />
              <FieldContainer
                label="Email"
                content="fadlihdytullah.dev@gmail.com"
              />
              <FieldContainer
                label="Alamat"
                content="Prumnas Surabaya Permai RT 11, RW 04, Blok F9/50, Kec. Sungai Serut, Kel. Surabaya, Kota Bengkulu, Bengkulu, 38119"
              />
              <FieldContainer label="Asal" content="Bengkulu" />
              <FieldContainer label="Tanggal Lahir" content="18 Juli 2020" />
              <FieldContainer label="Jenis Kelamin" content="Laki-laki" />
              <FieldContainer label="Telepon" content="081809751253" />
              <FieldContainer label="Pendidikan Terakhir" content="Diploma" />
              <FieldContainer label="Nilai TOEFL" content="507" />
              <FieldContainer label="Nilai Tes 360" content="8.5" />
              <FieldContainer label="ID Instagram" content="fadli_suikoden2" />
              <FieldContainer
                label="ID Facebook"
                content="fadli.hidayatullah"
              />
            </View>
            <View flexDirection="column" style={{width: 150}}>
              <View marginBottom={8}>
                <Avatar
                  src="https://avatars3.githubusercontent.com/u/44917664?s=460&v=4"
                  size={150}
                  shape="square"
                />
              </View>
              <Button type="dashed" block>
                Download CV
              </Button>

              <View marginTop={24}>
                <Typography.Paragraph strong>
                  Dokumen Lainnya
                </Typography.Paragraph>
                <Button type="dashed" block style={{marginBottom: 8}}>
                  Tes TOEFL/IELTS
                </Button>

                <Button type="dashed" block>
                  Tes 360
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
}

export default ApplicantModalDataView;
