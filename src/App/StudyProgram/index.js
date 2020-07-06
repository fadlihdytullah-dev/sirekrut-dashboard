// @flow
import * as React from 'react';
import axios from 'axios';
import {AppContext} from '../../contexts/AppContext';
import {STUDY_PROGRAMS_API, config} from '../config';
import {type StudyProgramType} from './../../types/App.flow';
import AddModal from './components/AddModal';
import View from '../../components/shared/View';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import Header from '../../components/commons/Header';
import {getColumnSortProps, capitalize} from './../Utils';
import {Table, Input, Button, Skeleton, Empty, Popconfirm, message} from 'antd';

type Props = {};

function StudyProgramPage(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [selectedStudyProgram, setSelectedStudyProgram] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);

  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const searchInput = React.useRef(null);

  const handleFetchStudyPrograms = async () => {
    try {
      dispatchApp({type: 'FETCH_STUDY_PROGRAMS_INIT'});

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
      message.error(error.message);

      dispatchApp({
        type: 'FETCH_STUDY_PROGRAMS_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  React.useEffect(
    () => {
      handleFetchStudyPrograms();
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

        const response = await axios.delete(STUDY_PROGRAMS_API.delete(id), {
          headers: config.headerConfig,
        });

        const result = response.data;
        if (result.success) {
          message.success({content: 'Data telah berhasil dihapus', key});
          handleFetchStudyPrograms();
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

  const handleSubmit = async (studyProgram: any, isEdit: boolean) => {
    try {
      setIsSubmitting(true);

      const URL = isEdit
        ? STUDY_PROGRAMS_API.update(studyProgram.id)
        : STUDY_PROGRAMS_API.post;
      const method = isEdit ? 'put' : 'post';

      const response = await axios[method](URL, studyProgram, {
        headers: config.headerConfig,
      });

      const result = response.data;

      if (result.success) {
        message.success(
          `Data telah berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}`
        );
        handleFetchStudyPrograms();
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

  const handleAddNew = () => {
    setShowModal(true);
    setSelectedStudyProgram(null);
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
        setSelectedStudyProgramKeys,
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
              setSelectedStudyProgramKeys(
                e.target.value ? [e.target.value] : []
              )
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
    (data: StudyProgramType) => {
      setSelectedStudyProgram(data);
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
        width: '40%',
        ...getColumnSearchProps('name'),
        ...getColumnSortProps('name'),
      },
      {
        title: 'Strata',
        dataIndex: 'degree',
        key: 'degree',
        ...getColumnSortProps('degree', true),
        render: (degree) => {
          return <span>{capitalize(degree)}</span>;
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
                onClick={() => handleSelectedStudyProgram(record)}>
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
    [getColumnSearchProps, handleConfirmDelete, handleSelectedStudyProgram]
  );

  const handleCloseModal = () => {
    setSelectedStudyProgram(null);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Header
        title="Program Studi"
        subtitle={`Total data: ${appState.studyPrograms.length}`}
        rightContent={
          <Button
            type="primary"
            size="large"
            onClick={handleAddNew}
            disabled={appState.loading}>
            Tambah Program Studi
          </Button>
        }
      />

      <AddModal
        visible={showModal}
        studyProgram={selectedStudyProgram}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />

      <View marginTop={24}>
        <Button
          type="dashed"
          onClick={() => {
            handleFetchStudyPrograms();
          }}>
          Muat Ulang
        </Button>
      </View>

      <View marginTop={16}>
        {appState.loading ? (
          <Skeleton />
        ) : !appState.studyPrograms.length ? (
          <View paddingTop={32}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </View>
        ) : (
          <Table columns={columns} dataSource={appState.studyPrograms} />
        )}
      </View>
    </React.Fragment>
  );
}

export default StudyProgramPage;
