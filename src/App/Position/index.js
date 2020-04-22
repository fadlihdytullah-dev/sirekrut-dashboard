// @flow
import * as React from 'react';
import type {CompactStudyProgramType} from './../../types/App.flow';
import {AppContext} from '../../contexts/AppContext';
import AddModal from './components/AddModal';
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
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import {POSITIONS_API, STUDY_PROGRAMS_API, config} from './../config';

import {getColumnSortProps} from './../Utils';

type Props = {};

const generateStudyProgramList = (list: Array<CompactStudyProgramType>) => {
  return (
    <View>
      {list.map((item) => (
        <View>
          <Typography.Text type="secondary">{item.name}</Typography.Text>
        </View>
      ))}
    </View>
  );
};

function Position(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [selectedPosition, setSelectedPosition] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');

  const handleFetch = async () => {
    dispatchApp({type: 'FETCH_POSITIONS_INIT'});

    try {
      const response = await axios.get(POSITIONS_API.getAll);
      const result = response.data;

      if (result.success) {
        dispatchApp({
          type: 'FETCH_POSITIONS_SUCCESS',
          payload: {positions: result.data},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      dispatchApp({
        type: 'FETCH_POSITIONS_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  const handleFetchStudyPrograms = async () => {
    try {
      const response = await axios.get(STUDY_PROGRAMS_API.getAll);
      const result = response.data;

      if (result.success) {
        dispatchApp({
          type: 'FETCH_STUDY_PROGRAMS_SUCCESS',
          payload: {studyPrograms: result.data},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      dispatchApp({
        type: 'FETCH_STUDY_PROGRAMS_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  React.useEffect(
    () => {
      handleFetch();
      handleFetchStudyPrograms();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = async (position: any, isEdit: boolean) => {
    try {
      setIsSubmitting(true);

      const URL = isEdit
        ? POSITIONS_API.update(position.id)
        : POSITIONS_API.post;
      const method = isEdit ? 'put' : 'post';

      const response = await axios[method](URL, position, {
        headers: config.headerConfig,
      });

      const result = response.data;

      if (result.success) {
        message.success(
          `Data telah berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}`
        );
        handleFetch();
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
      setShowModal(false);
    }
  };

  const handleAddNew = () => {
    setShowModal(true);
    setSelectedPosition(null);
  };

  const handleConfirmDelete = React.useCallback(
    async (id: string) => {
      const key = 'loading';

      try {
        message.loading({
          content: 'Menghapus data...',
          key,
        });

        const response = await axios.delete(POSITIONS_API.delete(id), {
          headers: config.headerConfig,
        });

        const result = response.data;

        if (result.success) {
          message.success({content: 'Data telah berhasil dihapus', key});
          handleFetch();
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
    setShowModal(false);
  };

  const searchInput = React.useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleSelectedPosition = React.useCallback((position) => {
    setSelectedPosition(position);
    setShowModal(true);
  }, []);

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
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        ...getColumnSortProps('name'),
      },
      {
        title: 'IPK Minimum',
        dataIndex: 'minimumGPA',
        key: 'minimumGPA',
        ...getColumnSortProps('minimumGPA', true),
      },
      {
        title: 'Lulusan Minimum',
        dataIndex: 'minimumGraduate',
        key: 'minimumGraduate',
        ...getColumnSortProps('minimumGraduate', true),
      },
      {
        title: 'Program Studi',
        dataIndex: 'studyPrograms',
        key: 'studyPrograms',
        ...getColumnSortProps('studyPrograms'),
        render: (studyPrograms) => {
          if (typeof studyPrograms === 'string' && studyPrograms === 'ALL') {
            return <Tag color="red">Semua</Tag>;
          }

          if (Array.isArray(studyPrograms) && studyPrograms.length > 0) {
            const content = generateStudyProgramList(studyPrograms);
            return (
              <Popover title="Program Studi" content={content}>
                <Button size="small" type="dashed">
                  Detail
                </Button>
              </Popover>
            );
          }
        },
      },
      {
        title: 'Aksi',
        key: 'action',
        render: (record) => {
          return (
            <span>
              <Button
                size="small"
                type="link"
                onClick={() => handleSelectedPosition(record)}>
                Edit
              </Button>
              <Popconfirm
                title="Apakah Anda yakin ingin menghapus data ini?"
                onConfirm={() => handleConfirmDelete(record.id)}
                onCancel={handleCancelDelete}
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
    [getColumnSearchProps, handleConfirmDelete, handleSelectedPosition]
  );

  return (
    <React.Fragment>
      <Header
        title="Posisi"
        subtitle={`Total data: ${appState.positions.length}`}
        rightContent={
          <Button
            disabled={appState.loading}
            size="large"
            type="primary"
            onClick={handleAddNew}>
            Tambah Posisi
          </Button>
        }
      />

      <AddModal
        visible={showModal}
        position={selectedPosition}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />

      <View marginTop={16}>
        {appState.loading ? (
          <Skeleton />
        ) : !appState.positions.length ? (
          <View paddingTop={32}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </View>
        ) : (
          <Table columns={columns} dataSource={appState.positions} />
        )}
      </View>
    </React.Fragment>
  );
}

export default Position;
