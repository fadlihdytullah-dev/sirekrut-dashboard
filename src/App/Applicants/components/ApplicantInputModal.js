// @flow
import * as React from 'react';
import {Modal, Button, Form, Input, message} from 'antd';
import axios from 'axios';
import {SUBMISSONS_API, config} from '../../config';
import View from '../../../components/shared/View';

type Props = {
  visible: boolean,
  onClose: () => void,
};

const initScore = () => ({
  interviewScore: 0,
  academicScore: 0,
  psikotesScore: 0,
});

function ApplicantInputModal(props: Props) {
  const [score, setScore] = React.useState(initScore());
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChangeInput = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setScore((state) => ({
      ...state,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = async (timeLine: any, isEdit: boolean) => {
    try {
      const scoreData = {
        score,
      };
      setIsSubmitting(true);
      const URL = SUBMISSONS_API.update(props.dataBiodata.id);

      const method = 'put';

      const response = await axios[method](URL, scoreData, {
        headers: config.headerConfig,
      });

      const result = response.data;

      if (result.success) {
        message.success(
          `Data telah berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}`
        );
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

  return (
    <React.Fragment>
      <Modal
        width={800}
        visible={props.visible}
        title={`${props.title} - ${
          props.dataBiodata && props.dataBiodata.fullName
        }`}
        onOk={props.onClose}
        onCancel={props.onClose}
        footer={[
          <Button key="back" onClick={props.onClose}>
            Kembali
          </Button>,
        ]}>
        <View style={{width: '400px'}}>
          <View flexDirection="row">
            <div style={{display: 'flex', flex: 1}}>
              <Input
                name="academicScore"
                defaultValue={
                  props.dataBiodata &&
                  props.dataBiodata.score &&
                  props.dataBiodata.score.academicScore
                }
                onChange={handleChangeInput}
                placeholder={'Input Academic Score'}
                allowClear={true}
              />
            </div>

            <View marginLeft={8}>
              <Button onClick={handleSubmit} type="primary">
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
}

export default ApplicantInputModal;
