// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import {Button, Table, Popconfirm} from 'antd';
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
        isSubmitting={false}
        onClose={() => setShowModal(false)}
        onSubmit={() => {}}
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
