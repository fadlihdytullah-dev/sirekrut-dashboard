// @flow
import * as React from 'react';

import {type StudyProgramType} from './../../types/App.flow';
import {AppContext} from '../../contexts/AppContext';

import AddModal from './components/AddModal';
import Header from '../../components/commons/Header';
import View from '../../components/shared/View';
import Highlighter from 'react-highlight-words';
import {Table, Input, Button, Skeleton, Empty, Popconfirm, message} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {getColumnSortProps} from './../Utils';

type Props = {};

const DATA_SOURCE = [
  {
    id: '1',
    name: 'D3 Teknik Informatika',
  },
  {
    id: '2',
    name: 'S1 Sistem Komputer',
  },
  {
    id: '4',
    name: 'S2 Magister Informatika',
  },
  {
    id: '5',
    name: 'S1 Manajemen Bisnis dan Teknologi Informasi',
  },
  {
    id: '6',
    name: 'D3 Perhotelan',
  },
  {
    id: '7',
    name: 'D3 Sistem Informasi',
  },
  {
    id: '8',
    name: 'D3 Perhotelan',
  },
  {
    id: '9',
    name: 'S3 Manajemen',
  },
  {
    id: '10',
    name: 'S2 Bioteknologi dan Kimia',
  },
];

const getStudyPrograms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DATA_SOURCE);
    }, 2000);
  });
};

function StudyProgram(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [selected, setSelected] = React.useState(null);

  const handleFetch = async () => {
    try {
      const result = await getStudyPrograms();
      dispatchApp({
        type: 'FETCH_STUDY_PROGRAMS_SUCCESS',
        payload: {studyPrograms: result},
      });
    } catch (error) {
      dispatchApp({
        type: 'FETCH_POSITIONS_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  React.useEffect(
    () => {
      dispatchApp({type: 'FETCH_STUDY_PROGRAMS_INIT'});
      handleFetch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [showModal, setShowModal] = React.useState(false);

  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const searchInput = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await message.loading('Sedang menghapus', 1);
      message.success('Data telah berhasil dihapus');
    } catch (error) {
      console.log('❌ error:=', error);
      message.error('Gagal menghapus');
    }
  };

  const handleCancelDelete = () => {};

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
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

  const handleSelectedStudyProgram = React.useCallback(
    (value: StudyProgramType) => {
      setSelected(value);
      setShowModal(true);
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        width: '75%',
        ...getColumnSearchProps('name'),
        ...getColumnSortProps('name'),
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
                onClick={() => handleSelectedStudyProgram(record)}>
                Edit
              </Button>
              <Popconfirm
                title="Apakah Anda yakin ingin menghapus data ini?"
                onConfirm={handleConfirmDelete}
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
    [getColumnSearchProps, handleSelectedStudyProgram]
  );

  const handleCloseModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Header
        title="Program Studi"
        subtitle={`Total data: ${appState.studyPrograms.length}`}
        rightContent={
          <Button type="primary" size="large" onClick={handleAddNew}>
            Tambah Program Studi
          </Button>
        }
      />

      {showModal && (
        <AddModal
          isVisible={showModal}
          onClose={handleCloseModal}
          selected={selected}
        />
      )}

      <View marginTop={16}>
        {appState.loading ? (
          <Skeleton />
        ) : !appState.studyPrograms.length ? (
          <View paddingTop={32}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </View>
        ) : (
          <Table
            pagination={false}
            columns={columns}
            dataSource={appState.studyPrograms}
          />
        )}
      </View>
    </React.Fragment>
  );
}

export default StudyProgram;
