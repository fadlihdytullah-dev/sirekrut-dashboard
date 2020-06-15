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
  Input,
  Tag,
  Popover,
  Popconfirm,
  Empty,
  Typography,
  message,
  Badge,
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import {TIMELINES_API, POSITIONS_API, config} from '../config';

import {getColumnSortProps, capitalize, formatDate} from './../Utils';

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
  const [selectedPosition, setSelectedPosition] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
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

  // const handleFetchPositions = async () => {
  //   dispatchApp({type: 'FETCH_POSITIONS_INIT'});

  //   try {
  //     const response = await axios.get(POSITIONS_API.getAll);
  //     const result = response.data;

  //     if (result.success) {
  //       dispatchApp({
  //         type: 'FETCH_POSITIONS_SUCCESS',
  //         payload: {positions: result.data},
  //       });
  //     } else {
  //       throw new Error(result.errors);
  //     }
  //   } catch (error) {
  //     message.error(error.message);

  //     dispatchApp({
  //       type: 'FETCH_POSITIONS_FAILURE',
  //       payload: {error: error.message},
  //     });
  //   }
  // };

  React.useEffect(
    () => {
      handleFetchTimelines();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // React.useEffect(
  //   () => {
  //     handleFetchPositions();
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  const handleSubmit = async (position: any, isEdit: boolean) => {
    // try {
    //   setIsSubmitting(true);
    //   const URL = isEdit
    //     ? POSITIONS_API.update(position.id)
    //     : POSITIONS_API.post;
    //   const method = isEdit ? 'put' : 'post';
    //   const response = await axios[method](URL, position, {
    //     headers: config.headerConfig,
    //   });
    //   const result = response.data;
    //   if (result.success) {
    //     message.success(
    //       `Data telah berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}`
    //     );
    //     handleFetchPositions();
    //     setShowModal(false);
    //   } else {
    //     throw new Error(result.errors);
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     message.error(error.response.data.errors);
    //   } else {
    //     message.error(error.message);
    //   }
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleAddNew = () => {
    // setShowModal(true);
    // setSelectedPosition(null);
  };

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

  const handleCancelDelete = () => {};

  const handleCloseModal = () => {
    // setShowModal(false);
  };

  const searchInput = React.useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    // confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    // clearFilters();
    // setSearchText('');
  };

  const handleSelectedPosition = React.useCallback((position) => {
    // setSelectedPosition(position);
    // setShowModal(true);
  }, []);

  const handleClickEdit = (id: string) => {
    history.push(`/periods/edit/${id}`);
  };

  const getColumnSearchProps = React.useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{padding: 8}}>
          <Input
            ref={(node) => {
              searchInput.current = node;
            }}
            placeholder={`Pencarian`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{width: 188, marginBottom: 8, display: 'block'}}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{width: 90, marginRight: 8}}>
            Cari
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{width: 90}}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current && searchInput.current.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }),
    [searchText, searchedColumn]
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
            <Popover title="Program Studi" content={content}>
              <Button size="small" type="dashed">
                Detail
              </Button>
            </Popover>
          );
        },
      },
      {
        // title: 'Total Pelamar',
        // dataIndex: 'endDate',
        // key: 'endDate',
        // render: (endDate) => {
        //   return <span>23</span>;
        // },
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
              <Button
                size="small"
                type="link"
                onClick={() => handleClickEdit(record.id)}>
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
    [handleClickEdit, handleConfirmDelete]
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
      {/* <AddModal
        visible={showModal}
        position={selectedPosition}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      /> */}
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
