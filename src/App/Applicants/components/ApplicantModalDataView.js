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
  console.log('ℹ️ props:=', props);
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
            <Typography.Text strong>
              {props.dataBiodata && props.dataBiodata.positionName}
            </Typography.Text>
          </Typography.Paragraph>
          <View flexDirection="row">
            <View style={{width: '500px'}}>
              <FieldContainer
                label="Nama"
                content={props.dataBiodata && props.dataBiodata.fullName}
              />
              <FieldContainer
                label="Email"
                content={props.dataBiodata && props.dataBiodata.email}
              />
              <FieldContainer
                label="Alamat"
                content={props.dataBiodata && props.dataBiodata.address}
              />
              <FieldContainer
                label="Asal"
                content={props.dataBiodata && props.dataBiodata.originFrom}
              />
              <FieldContainer
                label="Tanggal Lahir"
                content={props.dataBiodata && props.dataBiodata.dateOfBirth}
              />
              <FieldContainer
                label="Jenis Kelamin"
                content={props.dataBiodata && props.dataBiodata.gender}
              />
              <FieldContainer
                label="Telepon"
                content={props.dataBiodata && props.dataBiodata.phoneNumber}
              />
              <FieldContainer
                label="Pendidikan Terakhir"
                content={props.dataBiodata && props.dataBiodata.lastEducation}
              />
              {props.dataBiodata && props.dataBiodata.toeflFile && (
                <FieldContainer
                  label="Nilai TOEFL"
                  content={props.dataBiodata.toeflScore}
                />
              )}
              {props.dataBiodata && props.dataBiodata._360File && (
                <FieldContainer
                  label="Nilai Tes 360"
                  content={props.dataBiodata._360Score}
                />
              )}
            </View>
            <View flexDirection="column" style={{width: 150}}>
              <View marginBottom={8}>
                <Avatar
                  src={props.dataBiodata && props.dataBiodata.profilePicture}
                  size={150}
                  shape="square"
                />
              </View>
              <Button type="dashed" block>
                <a
                  href={props.dataBiodata && props.dataBiodata.cvFile}
                  target="_blank"
                  download={true}>
                  Download CV
                </a>
              </Button>

              <View marginTop={24}>
                <Typography.Paragraph strong>
                  Dokumen Lainnya
                </Typography.Paragraph>
                {props.dataBiodata && props.dataBiodata.toeflFile && (
                  <Button type="dashed" block style={{marginBottom: 8}}>
                    <a
                      href={props.dataBiodata && props.dataBiodata.toeflFile}
                      target="_blank"
                      download={true}>
                      Tes TOEFL/IELTS
                    </a>
                  </Button>
                )}

                {props.dataBiodata && props.dataBiodata._360File && (
                  <Button type="dashed" block>
                    <a
                      href={props.dataBiodata && props.dataBiodata._360File}
                      target="_blank"
                      download={true}>
                      Tes 360
                    </a>
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
}

export default ApplicantModalDataView;
