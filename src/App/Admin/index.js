// @flow
import * as React from 'react';
import axios from 'axios';
import {AppContext} from '../../contexts/AppContext';
import {AUTH_API, config} from '../config';
import View from '../../components/shared/View';
import Header from '../../components/commons/Header';
import AddModal from './components/AddModal';
import {Button, Table, Popconfirm, message, Skeleton, Typography} from 'antd';
import {capitalize} from '../Utils';

type Props = {};

function Admin(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [showModal, setShowModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFetchUser = React.useCallback(async () => {
    try {
      dispatchApp({type: 'FETCH_USERS_INIT'});

      const response = await axios.get(AUTH_API.get);
      const result = response.data;

      if (result.success) {
        // Remove current logged in user
        const email = localStorage.getItem('email');
        const updatedUsers = result.data.filter((item) => item.email !== email);

        dispatchApp({
          type: 'FETCH_USERS_SUCCESS',
          payload: {users: updatedUsers},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: 'FETCH_USERS_FAILURE',
        payload: {error: error.message},
      });
    }
  }, [dispatchApp]);

  let columns = [
    {
      title: 'NIP',
      dataIndex: 'nip',
    },
    {
      title: 'Nama',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Typography.Text
          type={`${(status === 'NONACTIVE' && 'secondary') || ''}`}>
          {capitalize(status)}
        </Typography.Text>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (record) => {
        return (
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin mengubah status user ini?"
              onConfirm={() => handleChangeUserStatus(record.id)}
              onCancel={() => {}}
              okText="Iya"
              cancelText="Tidak">
              <Button
                size="small"
                type="link"
                danger={record.status === 'ACTIVE'}>
                {record.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const handleChangeUserStatus = async (id) => {
    try {
      setIsSubmitting(true);

      const key = 'loading';
      message.loading({
        content: 'Memperbarui data...',
        key,
      });

      const URL = AUTH_API.changeStatus(id);
      const method = 'put';
      const response = await axios[method](URL, {
        headers: config.headerConfig,
      });

      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui `);

        handleFetchUser();
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

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const URL = AUTH_API.register;
      const method = 'post';
      const response = await axios[method](URL, data, {
        headers: config.headerConfig,
      });

      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui `);
        setShowModal(false);
        handleFetchUser();
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

  React.useEffect(
    () => {
      handleFetchUser();
    },
    // eslint-disable-next-line
    []
  );

  const totalData = appState.users.length || 0;

  return (
    <React.Fragment>
      <Header
        title="Manajemen Admin"
        subtitle={`Total data: ${totalData}`}
        rightContent={
          <Button
            // disabled={appState.loading}
            size="large"
            type="primary"
            onClick={() => setShowModal(true)}>
            Tambah Admin
          </Button>
        }
      />

      <AddModal
        visible={showModal}
        admin={null}
        isSubmitting={isSubmitting}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => handleSubmit(data)}
      />

      <View marginTop={24}>
        <Button
          type="dashed"
          onClick={() => {
            handleFetchUser();
          }}>
          Muat Ulang
        </Button>
      </View>

      <View marginTop={24}>
        {appState.loading ? (
          <Skeleton />
        ) : (
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {},
              };
            }}
            columns={columns}
            dataSource={appState.users}
          />
        )}
      </View>
    </React.Fragment>
  );
}

export default Admin;
