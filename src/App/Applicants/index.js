// @flow
import * as React from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {SUBMISSONS_API, TIMELINES_API, POSITIONS_API, config} from '../config';
import {AppContext} from '../../contexts/AppContext';
import {
  Button,
  Table,
  Skeleton,
  message,
  Select,
  Popconfirm,
  Input,
  Typography,
} from 'antd';
import View from '../../components/shared/View';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import Header from '../../components/commons/Header';
import {EditOutlined, SaveOutlined} from '@ant-design/icons';
import ApplicantInputModal from './components/ApplicantInputModal';
import ApplicantModalDataView from './components/ApplicantModalDataView';
import PassedApplicantsTable from './components/PassedApplicantsTable';

type Props = {};

const {Option} = Select;

const initScore = () => ({
  academicScore: 0,
  psikotesScore: 0,
  microteaching: 0,
  interviewScore: 0,
  orientation: 0,
});

const regexPhone = /^[0-9]*$/;

function ApplicantsPage(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectUser, setSelectUser] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [score, setScore] = React.useState(initScore());
  const [activeTab, setActiveTab] = React.useState<
    | 'APPLLICANTS'
    | 'ACADEMIC_SCORE'
    | 'PSIKOTEST_SCORE'
    | 'MICROTEACHING_SCORE'
    | 'INTERVIEW_SCORE'
    | 'ORIENTATION_SCORE'
    | 'AGREEMENT'
    | 'PASSED'
  >('APPLLICANTS');
  const [showModal, setShowModal] = React.useState(false);
  const [showModalInput, setShowModalInput] = React.useState(false);
  const [singleData, setSingleData] = React.useState({});
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const location = useLocation();

  const searchInput = React.useRef(null);

  const handleSearchData = (selectedKeys, confirm, dataIndex) => {
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
            onPressEnter={() =>
              handleSearchData(selectedKeys, confirm, dataIndex)
            }
            style={{width: 188, marginBottom: 8, display: 'block'}}
          />
          <Button
            type="primary"
            onClick={() => handleSearchData(selectedKeys, confirm, dataIndex)}
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectUser(selectedRowKeys);
    },
    getCheckboxProps: (record) => {
      return {
        fullName: record.fullName,
      };
    },
  };

  const handleChangeInput = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    if (regexPhone.test(value)) {
      setScore((state) => ({
        ...state,
        [name]: parseInt(value),
      }));
    }
  };

  const handleSubmit = async (id: string) => {
    try {
      const scoreData = {
        score,
      };

      const URL = SUBMISSONS_API.update(id);
      const method = 'put';
      const response = await axios[method](URL, scoreData, {
        headers: config.headerConfig,
      });

      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui `);
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.errors);
      } else {
        message.error(error.message);
      }
    }
  };

  const handleUpdateStatusApplicant = async (statusID) => {
    try {
      const data = {
        applicants: selectUser,
        updatedStatus: statusID,
      };

      const URL = SUBMISSONS_API.updateStatus;
      const method = 'put';
      const response = await axios[method](URL, data, {
        headers: config.headerConfig,
      });

      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui `);
        if (activeTab === 'APPLLICANTS') handleFetchSubmissions(0);
        if (activeTab === 'ACADEMIC_SCORE') handleFetchSubmissions(1);
        if (activeTab === 'PSIKOTEST_SCORE') handleFetchSubmissions(2);
        if (activeTab === 'MICROTEACHING_SCORE') handleFetchSubmissions(3);
        if (activeTab === 'INTERVIEW_SCORE') handleFetchSubmissions(4);
        if (activeTab === 'ORIENTATION_SCORE') handleFetchSubmissions(5);
        if (activeTab === 'AGREEMENT') handleFetchSubmissions(6);
        if (activeTab === 'PASSED') handleFetchSubmissions(7);
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.errors);
      } else {
        message.error(error.message);
      }
    }
  };

  const buttonEditScore = (record, scoreTitle) => {
    let disabled;
    if (isEditing) {
      if (!record.isEditing[scoreTitle]) {
        disabled = true;
      }
    }

    return (
      <Button
        type="primary"
        icon={
          record.isEditing[scoreTitle] ? <SaveOutlined /> : <EditOutlined />
        }
        size={'small'}
        disabled={disabled}
        onClick={() => {
          setIsEditing(!isEditing);
          const indexNumber = appState.submissions.findIndex(
            (data) => data.id === record.id
          );
          if (record.isEditing[scoreTitle]) {
            handleSubmit(record.id);
            editScore(indexNumber, false, scoreTitle, score[scoreTitle]);
            setScore((state) => ({
              academicScore: 0,
              psikotesScore: 0,
              microteaching: 0,
              interviewScore: 0,
              orientation: 0,
            }));
          } else {
            editScore(indexNumber, true, scoreTitle, record.score[scoreTitle]);
          }
        }}
      />
    );
  };

  let columns = [];

  let defaultColumns = [
    {
      title: 'Nama',
      dataIndex: 'fullName',
      ...getColumnSearchProps('fullName'),
      render: (text) => {
        const getSingleData = appState.submissions.filter(
          (data) => data.fullName === text
        );

        return (
          <Button
            type="link"
            onClick={() => {
              setShowModal(true);
              setSingleData(getSingleData[0]);
            }}>
            {text}
          </Button>
        );
      },
    },
    {
      title: 'Posisi',
      dataIndex: 'positionName',
    },
  ];

  const academiScoreColumn = {
    title: 'Nilai Akademik',
    key: 'academic_score',
    render: (record, index) => {
      return (
        <span>
          <Button
            size="small"
            type="link"
            style={{display: 'inline-block'}}
            onClick={() => {}}>
            {record.isEditing['academicScore'] ? (
              <input
                type="number"
                name="academicScore"
                style={{width: '30px'}}
                onChange={handleChangeInput}
                defaultValue={record.score.academicScore}
              />
            ) : (
              record.score.academicScore
            )}
          </Button>
          {activeTab === 'ACADEMIC_SCORE'
            ? buttonEditScore(record, 'academicScore')
            : null}
        </span>
      );
    },
  };

  const psikotestScoreColumn = {
    title: 'Nilai Psikotes',
    key: 'psikotes_score',
    render: (record) => {
      return (
        <span>
          <Button size="small" type="link">
            {record.isEditing['psikotesScore'] ? (
              <input
                type="number"
                name="psikotesScore"
                style={{width: '30px'}}
                onChange={handleChangeInput}
                defaultValue={record.score.psikotesScore}
              />
            ) : (
              record.score.psikotesScore
            )}
          </Button>
          {activeTab === 'PSIKOTEST_SCORE'
            ? buttonEditScore(record, 'psikotesScore')
            : null}
        </span>
      );
    },
  };

  const microteachingScoreColumn = {
    title: 'Nilai Microteaching',
    key: 'microteaching_score',
    render: (record) => {
      return (
        <span>
          <Button size="small" type="link">
            {record.isEditing['microteachingScore'] ? (
              <input
                type="number"
                name="microteachingScore"
                style={{width: '30px'}}
                onChange={handleChangeInput}
                defaultValue={record.score.microteachingScore}
              />
            ) : (
              record.score.microteachingScore
            )}
          </Button>
          {activeTab === 'MICROTEACHING_SCORE'
            ? buttonEditScore(record, 'microteachingScore')
            : null}
        </span>
      );
    },
  };

  const interviewScoreColumn = {
    title: 'Nilai Wawancara',
    key: 'interview_score',
    render: (record) => {
      return (
        <span>
          <Button size="small" type="link">
            {record.isEditing['interviewScore'] ? (
              <input
                type="number"
                name="interviewScore"
                style={{width: '30px'}}
                onChange={handleChangeInput}
                defaultValue={record.score.interviewScore}
              />
            ) : (
              record.score.interviewScore
            )}
          </Button>
          {activeTab === 'INTERVIEW_SCORE'
            ? buttonEditScore(record, 'interviewScore')
            : null}
        </span>
      );
    },
  };

  const orientationScoreColumn = {
    title: 'Nilai Orientasi',
    key: 'orientation_score',
    render: (record) => {
      return (
        <span>
          <Button size="small" type="link">
            {record.isEditing['orientationScore'] ? (
              <input
                type="number"
                name="orientationScore"
                style={{width: '30px'}}
                onChange={handleChangeInput}
                defaultValue={record.score.orientationScore}
              />
            ) : (
              record.score.orientationScore
            )}
          </Button>
          {activeTab === 'ORIENTATION_SCORE'
            ? buttonEditScore(record, 'orientationScore')
            : null}
        </span>
      );
    },
  };

  const agreementColumn = {
    title: 'Kontrak',
    key: 'contract',
    render: (record) => {
      if (record.passed === 2) {
        return (
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin membatalkan aksi sebelumnya?"
              onConfirm={() => {
                handleUpdateStatusAgreement(
                  record.id,
                  0,
                  record.positionId,
                  record.periodId
                );
              }}
              okText="Iya"
              cancelText="Tidak">
              <Button size="small" type="dashed">
                Menerima
              </Button>
            </Popconfirm>
          </span>
        );
      }
      if (record.passed === 1) {
        return (
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin membatalkan aksi sebelumnya?"
              onConfirm={() => {
                handleUpdateStatusAgreement(
                  record.id,
                  0,
                  record.positionId,
                  record.periodId
                );
              }}
              okText="Iya"
              cancelText="Tidak">
              <Button size="small" type="dashed">
                Menolak
              </Button>
            </Popconfirm>
          </span>
        );
      }
      if (record.passed === 0) {
        return (
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin menyetujui pelamar ini?"
              onConfirm={() =>
                handleUpdateStatusAgreement(
                  record.id,
                  2,
                  record.positionId,
                  record.periodId
                )
              }
              onCancel={() =>
                handleUpdateStatusAgreement(
                  record.id,
                  1,
                  record.positionId,
                  record.periodId
                )
              }
              okText="Iya"
              cancelText="Tidak">
              <Button size="small" type="link">
                Konfirmasi
              </Button>
            </Popconfirm>
          </span>
        );
      }
    },
  };

  const determinationColumn = {
    title: 'Penetapan',
    key: 'determination',
    render: (record) => {
      if (record.determination === 2) {
        return (
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin membatalkan aksi sebelumnya?"
              onConfirm={() => {
                handleUpdateStatusDetermination(
                  record.id,
                  0,
                  record.positionId,
                  record.periodId
                );
              }}
              okText="Iya"
              cancelText="Tidak">
              <Button size="small" type="dashed">
                Lulus
              </Button>
            </Popconfirm>
          </span>
        );
      }
      if (record.determination === 1) {
        return (
          <span>
            <span>
              <Popconfirm
                title="Apakah Anda yakin ingin membatalkan aksi sebelumnya?"
                onConfirm={() => {
                  handleUpdateStatusDetermination(
                    record.id,
                    0,
                    record.positionId,
                    record.periodId
                  );
                }}
                okText="Iya"
                cancelText="Tidak">
                <Button size="small" type="dashed">
                  Mengundurkan Diri
                </Button>
              </Popconfirm>
            </span>
          </span>
        );
      }
      if (record.determination === 0) {
        return (
          <span>
            <Popconfirm
              disabled={record.passed !== 2}
              title="Apakah Anda yakin ingin menetapkan pelamar ini?"
              onConfirm={() => {
                handleUpdateStatusDetermination(
                  record.id,
                  2,
                  record.positionId,
                  record.periodId
                );
              }}
              onCancel={() => {
                handleUpdateStatusDetermination(
                  record.id,
                  1,
                  record.positionId,
                  record.periodId
                );
              }}
              okText="Iya"
              cancelText="Undur Diri">
              <Button size="small" type="link" disabled={record.passed !== 2}>
                Konfirmasi
              </Button>
            </Popconfirm>
          </span>
        );
      }
    },
  };

  const editScore = (indexNumber, condition, scoreName, scoreValue) => {
    dispatchApp({
      type: 'SET_EDITING_SCORE_SUBMISSION',
      payload: {indexNumber, condition, scoreName, scoreValue},
    });
  };

  const handleUpdateStatusAgreement = async (
    idUser,
    idStatus,
    positionId,
    periodId
  ) => {
    try {
      const data = {
        id: idUser,
        updatedStatus: idStatus,
        positionId,
        periodId,
      };

      const URL = SUBMISSONS_API.updateStatusAgreement;
      const method = 'put';
      const response = await axios[method](URL, data, {
        headers: config.headerConfig,
      });
      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui`);
        handleFetchSubmissions(6);
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.errors);
      } else {
        message.error(error.message);
      }
    }
  };

  const handleUpdateStatusDetermination = async (
    idUser,
    idStatus,
    positionId,
    periodId
  ) => {
    try {
      const data = {
        id: idUser,
        updatedStatus: idStatus,
        positionId,
        periodId,
      };

      const URL = SUBMISSONS_API.updateStatusDetermination;
      const method = 'put';
      const response = await axios[method](URL, data, {
        headers: config.headerConfig,
      });
      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui`);
        handleFetchSubmissions(6);
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.errors);
      } else {
        message.error(error.message);
      }
    }
  };

  const handleFetchTimelines = async () => {
    try {
      dispatchApp({type: 'FETCH_TIMELINES_APPLICANT_INIT'});

      const response = await axios.get(TIMELINES_API.getAll);
      const result = response.data;

      if (result.success) {
        dispatchApp({
          type: 'FETCH_TIMELINES_APPLICANT_SUCCESS',
          payload: {dataTimelines: result.data},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: 'FETCH_TIMELINES_APPLICANT_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  const handleFetchSubmissions = async (statusSubmission, idPeriode) => {
    try {
      dispatchApp({type: 'FETCH_SUBMISSIONS_INIT'});
      const response = await axios.get(
        SUBMISSONS_API.getAll.concat(
          `?filter=status&filterValue=${
            statusSubmission === 7 ? 6 : statusSubmission
          }${idPeriode ? `&periode=${idPeriode}` : ''}${
            statusSubmission === 7 ? '&determination=2' : ''
          }`
        )
      );
      const result = response.data;

      if (result.success) {
        const fetchPosition = async () => {
          const data = result.data.map(async (dat) => {
            const res = await axios.get(
              POSITIONS_API.getSingle(dat.positionId)
            );
            const item = {
              ...dat,
              positionName: res.data.data.name,
              key: dat.id,
              isEditing: {
                interviewScore: false,
                academicScore: false,
                psikotesScore: false,
                microteachingScore: false,
                orientationScore: false,
              },
            };
            return item;
          });
          const promiseDone = Promise.all(data);
          return promiseDone;
        };
        const positionsData = await fetchPosition();
        console.log('positionsData', positionsData);
        dispatchApp({
          type: 'FETCH_SUBMISSIONS_SUCCESS',
          payload: {submissions: positionsData},
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: 'FETCH_SUBMISSIONS_FAILURE',
        payload: {error: error.message},
      });
    }
  };

  if (activeTab === 'ACADEMIC_SCORE') {
    columns = defaultColumns.concat([academiScoreColumn]);
  } else if (activeTab === 'PSIKOTEST_SCORE') {
    columns = defaultColumns.concat([academiScoreColumn, psikotestScoreColumn]);
  } else if (activeTab === 'MICROTEACHING_SCORE') {
    columns = defaultColumns.concat([
      academiScoreColumn,
      psikotestScoreColumn,
      microteachingScoreColumn,
    ]);
  } else if (activeTab === 'INTERVIEW_SCORE') {
    columns = defaultColumns.concat([
      academiScoreColumn,
      psikotestScoreColumn,
      microteachingScoreColumn,
      interviewScoreColumn,
    ]);
  } else if (activeTab === 'ORIENTATION_SCORE') {
    columns = defaultColumns.concat([
      academiScoreColumn,
      psikotestScoreColumn,
      microteachingScoreColumn,
      interviewScoreColumn,
      orientationScoreColumn,
    ]);
  } else if (activeTab === 'AGREEMENT') {
    columns = defaultColumns.concat([
      academiScoreColumn,
      psikotestScoreColumn,
      microteachingScoreColumn,
      interviewScoreColumn,
      orientationScoreColumn,
      agreementColumn,
      determinationColumn,
    ]);
  } else {
    columns = defaultColumns;
  }

  React.useEffect(() => {
    setData(appState.submissions);
  }, [appState.submissions]);

  React.useEffect(
    () => {
      setSelectUser([]);
      handleFetchTimelines();
      let query = null;
      if (location.state && location.state.data) {
        query = location.state.data.periodID;
      }
      if (activeTab === 'APPLLICANTS') {
        handleFetchSubmissions(0, query);
      }
      if (activeTab === 'ACADEMIC_SCORE') {
        handleFetchSubmissions(1, query);
      }
      if (activeTab === 'PSIKOTEST_SCORE') {
        handleFetchSubmissions(2, query);
      }
      if (activeTab === 'MICROTEACHING_SCORE') {
        handleFetchSubmissions(3, query);
      }
      if (activeTab === 'INTERVIEW_SCORE') {
        handleFetchSubmissions(4, query);
      }
      if (activeTab === 'ORIENTATION_SCORE') {
        handleFetchSubmissions(5, query);
      }
      if (activeTab === 'AGREEMENT') {
        handleFetchSubmissions(6, query);
      }
      if (activeTab === 'PASSED') {
        handleFetchSubmissions(7, query);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab]
  );

  return (
    <React.Fragment>
      <Header title="Pelamar"></Header>

      <ApplicantModalDataView
        dataBiodata={singleData}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />

      <ApplicantInputModal
        title={'Input nilai Akademik'}
        dataBiodata={singleData}
        visible={showModalInput}
        onClose={() => setShowModalInput(false)}
      />

      <View marginY={24}>
        <Typography.Text>Filter berdasarkan: </Typography.Text>
        <Select
          defaultValue={location.state ? location.state.data.periodID : 'ALL'}
          style={{width: '400px'}}
          placeholder="Pilih Periode"
          onChange={(idPeriode) => {
            if (idPeriode === 'ALL') {
              if (activeTab === 'APPLLICANTS') {
                handleFetchSubmissions(0, null);
              }
              if (activeTab === 'ACADEMIC_SCORE') {
                handleFetchSubmissions(1, null);
              }
              if (activeTab === 'PSIKOTEST_SCORE') {
                handleFetchSubmissions(2, null);
              }
              if (activeTab === 'MICROTEACHING_SCORE') {
                handleFetchSubmissions(3, null);
              }
              if (activeTab === 'INTERVIEW_SCORE') {
                handleFetchSubmissions(4, null);
              }
              if (activeTab === 'ORIENTATION_SCORE') {
                handleFetchSubmissions(5, null);
              }
              if (activeTab === 'AGREEMENT') {
                handleFetchSubmissions(6, null);
              }
              if (activeTab === 'PASSED') {
                handleFetchSubmissions(7, null);
              }
            }
            if (activeTab === 'APPLLICANTS')
              handleFetchSubmissions(0, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'ACADEMIC_SCORE')
              handleFetchSubmissions(1, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'PSIKOTEST_SCORE')
              handleFetchSubmissions(2, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'MICROTEACHING_SCORE')
              handleFetchSubmissions(3, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'INTERVIEW_SCORE')
              handleFetchSubmissions(4, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'ORIENTATION_SCORE')
              handleFetchSubmissions(5, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'AGREEMENT')
              handleFetchSubmissions(6, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'PASSED')
              handleFetchSubmissions(7, idPeriode === 'ALL' ? null : idPeriode);
          }}
          name="lastEducation">
          <Option value="ALL">Semua periode</Option>
          {appState.dataTimelines.map((data) => (
            <Option value={data.id}>{data.title}</Option>
          ))}
        </Select>
      </View>
      <View marginY={14} style={{width: '100%'}}>
        <Button
          type={activeTab === 'APPLLICANTS' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('APPLLICANTS')}>
          Lamaran
        </Button>
        <Button
          type={activeTab === 'ACADEMIC_SCORE' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('ACADEMIC_SCORE')}>
          Tes Akademik
        </Button>
        <Button
          type={activeTab === 'PSIKOTEST_SCORE' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('PSIKOTEST_SCORE')}>
          Tes Psikotes
        </Button>
        <Button
          type={activeTab === 'MICROTEACHING_SCORE' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('MICROTEACHING_SCORE')}>
          Microteaching
        </Button>
        <Button
          type={activeTab === 'INTERVIEW_SCORE' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('INTERVIEW_SCORE')}>
          Wawancara
        </Button>
        <Button
          type={activeTab === 'ORIENTATION_SCORE' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('ORIENTATION_SCORE')}>
          Orientasi
        </Button>
        <Button
          type={activeTab === 'AGREEMENT' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('AGREEMENT')}>
          Hasil
        </Button>
        <Button
          type={activeTab === 'PASSED' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('PASSED')}>
          Lulus
        </Button>
      </View>

      <View>
        <View flexDirection="row">
          <View marginBottom={16} marginRight={10}>
            <Button
              type="dashed"
              onClick={() => {
                setSelectUser([]);
                if (activeTab === 'APPLLICANTS') handleFetchSubmissions(0);
                if (activeTab === 'ACADEMIC_SCORE') handleFetchSubmissions(1);
                if (activeTab === 'PSIKOTEST_SCORE') handleFetchSubmissions(2);
                if (activeTab === 'MICROTEACHING_SCORE')
                  handleFetchSubmissions(3);
                if (activeTab === 'INTERVIEW_SCORE') handleFetchSubmissions(4);
                if (activeTab === 'ORIENTATION_SCORE')
                  handleFetchSubmissions(5);
                if (activeTab === 'AGREEMENT') handleFetchSubmissions(6);
                if (activeTab === 'PASSED') handleFetchSubmissions(7);
              }}>
              Muat Ulang
            </Button>
          </View>
          <View marginBottom={16}>
            {activeTab !== 'AGREEMENT' && activeTab !== 'PASSED' ? (
              <Button
                disabled={!selectUser.length ? true : false}
                onClick={() => {
                  setSelectUser([]);
                  let status = 0;
                  if (activeTab === 'APPLLICANTS') {
                    status = 1;
                  }
                  if (activeTab === 'ACADEMIC_SCORE') {
                    status = 2;
                  }
                  if (activeTab === 'PSIKOTEST_SCORE') {
                    status = 3;
                  }
                  if (activeTab === 'MICROTEACHING_SCORE') {
                    status = 4;
                  }
                  if (activeTab === 'INTERVIEW_SCORE') {
                    status = 5;
                  }
                  if (activeTab === 'ORIENTATION_SCORE') {
                    status = 6;
                  }
                  handleUpdateStatusApplicant(status);
                }}>
                Proses ke tahap selanjutnya
              </Button>
            ) : null}
          </View>
        </View>

        {appState.loading ? (
          <Skeleton />
        ) : activeTab === 'PASSED' ? (
          <PassedApplicantsTable data={data} />
        ) : (
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {},
              };
            }}
            rowSelection={
              activeTab !== 'AGREEMENT'
                ? {
                    type: 'checkbox',
                    ...rowSelection,
                  }
                : null
            }
            columns={columns}
            // dataSource={data}
            dataSource={data}
          />
        )}
      </View>
    </React.Fragment>
  );
}

export default ApplicantsPage;
