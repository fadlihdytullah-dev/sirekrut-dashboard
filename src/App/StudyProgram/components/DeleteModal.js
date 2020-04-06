// @flow
import * as React from 'react';

import {Modal, Button} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

type Props = {
  onClose: () => void,
};

function DeleteModal({onClose}: Props) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleClose = () => onClose();

  return (
    <Modal
      visible={true}
      title="Apakah Anda yakin ingin menghapus data ini?"
      footer={[
        <Button
          size="small"
          type="primary"
          loading={confirmLoading}
          onClick={() => {
            setConfirmLoading(true);
            setTimeout(() => {
              setConfirmLoading(false);
              handleClose();
            }, 2000);
          }}>
          Iya
        </Button>,
        <Button size="small" type="default">
          Tidak
        </Button>,
      ]}></Modal>
  );
}

export default DeleteModal;
