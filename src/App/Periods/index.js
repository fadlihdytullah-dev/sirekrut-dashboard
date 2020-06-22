// @flow
import * as React from 'react';
import {useHistory, Link} from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext';
// import AddModal from './components/AddModal';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import {
  Button,
  Skeleton,
  Table,
  Popover,
  Popconfirm,
  Empty,
  Typography,
  message,
  Badge,
} from 'antd';
import axios from 'axios';
import {TIMELINES_API, config} from '../config';

import {capitalize, formatDate} from './../Utils';

type Props = {};

const generatePositionList = (
  list: Array<{id: string, name: string, quota: number}>
) => {
  return (
    <View>
      {list.map((item) => (
        <View key={item.id}>
          <Typography.Text type="secondary">
            {item.name}
            <Badge count={item.quota} style={{backgroundColor: '#1890ff'}} />
          </Typography.Text>
        </View>
      ))}
    </View>
  );
};

function PeriodsPage(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const history = useHistory();

  const handleFetchTimelines = async () => {
    try {
      dispatchApp({type: 'FETCH_TIMELINES_INIT'});

      const response = await axios.get(TIMELINES_API.getAll);
      const result = response.data;
      console.log(result.data);

      if (result.success) {
        console.log(result.data, 'TRASDSADSADSAD');
        dispatchApp({
          type: 'FETCH_TIMELINES_SUCCESS',
          payload: {dataTimelines: result.data},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: 'FETCH_TIMELINES_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  React.useEffect(
    () => {
      handleFetchTimelines();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleConfirmDelete = React.useCallback(
    async (id: string) => {
      const key = 'loading';
      try {
        message.loading({
          content: 'Menghapus data...',
          key,
        });
        const response = await axios.delete(TIMELINES_API.delete(id), {
          headers: config.headerConfig,
        });
        const result = response.data;
        if (result.success) {
          message.success({content: 'Data telah berhasil dihapus', key});
          handleFetchTimelines();
        } else {
          throw new Error(result.errors);
        }
      } catch (error) {
        if (error.response) {
          message.error({content: error.response.data.errors, key});
        } else {
          message.error({content: error.message, key});
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const columns = React.useMemo(
    () => [
      {
        title: 'Judul',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Jenis',
        dataIndex: 'type',
        key: 'type',
        render: (type) => <span>{capitalize(type)}</span>,
      },
      {
        title: 'Tanggal mulai',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate) => {
          return <span>{formatDate(startDate)}</span>;
        },
      },
      {
        title: 'Tanggal berakhir',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (endDate) => {
          return <span>{formatDate(endDate)}</span>;
        },
      },
      {
        title: 'Posisi',
        dataIndex: 'positions',
        key: 'positions',
        render: (positions) => {
          const content = generatePositionList(positions);
          return (
            <Popover title="Posisi" content={content}>
              <Button size="small" type="dashed">
                Detail
              </Button>
            </Popover>
          );
        },
      },
      {
        title: 'Aksi',
        key: 'action',
        render: (record) => {
          return (
            <span>
              <Button size="small" type="dashed">
                <Link
                  to={{
                    pathname: '/applicant',
                    state: {
                      data: {
                        periodID: record.id,
                        periodName: record.title,
                        endDate: record.endDate,
                        startDate: record.startDate,
                      },
                    },
                  }}>
                  Liat Pelamar
                </Link>
              </Button>
              <Button size="small" type="link" onClick={() => {}}>
                Edit
              </Button>
              <Popconfirm
                title="Apakah Anda yakin ingin menghapus data ini?"
                onConfirm={() => handleConfirmDelete(record.id)}
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
    ],
    [handleConfirmDelete]
  );

  const handleClickAddNew = () => {
    history.push('/periods/add_new');
  };

  return (
    <React.Fragment>
      <Header
        title="Periode Rekrutmen"
        subtitle={`Total data: ${appState.dataTimelines.length}`}
        rightContent={
          <Button
            disabled={appState.loading}
            size="large"
            type="primary"
            onClick={handleClickAddNew}>
            Tambah Periode
          </Button>
        }
      />

      <View marginTop={24}>
        <Button
          type="dashed"
          onClick={() => {
            handleFetchTimelines();
          }}>
          Muat Ulang
        </Button>
      </View>

      <View marginTop={16}>
        {appState.loading ? (
          <Skeleton />
        ) : !appState.dataTimelines.length ? (
          <View paddingTop={32}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </View>
        ) : (
          <Table columns={columns} dataSource={appState.dataTimelines} />
        )}
      </View>
    </React.Fragment>
  );
}

export default PeriodsPage;
