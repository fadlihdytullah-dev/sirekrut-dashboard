// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import {Button, Table, Popconfirm, message} from 'antd';
import {AUTH_API, config} from '../config';
import axios from 'axios';
import AddModal from './components/AddModal';

type Props = {};

const DATA_SOURCE = [
  {
    id: '1',
    nip: '6711023',
    name: 'Fadli Hidayatullah',
    email: 'fadlihdytullah.dev@gmail.com',
  },
  {
    id: '2',
    nip: '9712324',
    name: 'Nindy Haris Putri',
    email: 'nindyharisputri@gmail.com',
  },
];

function Admin(props: Props) {
  const [showModal, setShowModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
      title: 'Aksi',
      key: 'action',
      render: (record) => {
        return (
          <span>
            <Button size="small" type="link" onClick={() => {}}>
              Edit
            </Button>
            <Popconfirm
              title="Apakah Anda yakin ingin menghapus data ini?"
              onConfirm={() => {}}
              onCancel={() => {}}
              okText="Iya"
              cancelText="Tidak">
              <Button size="small" type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

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
      <Header
        title="Manajemen Admin"
        subtitle={`Total data: 2`}
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
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setShowModal(true);
              },
            };
          }}
          columns={columns}
          dataSource={DATA_SOURCE}
        />
      </View>
    </React.Fragment>
  );
}

export default Admin;
