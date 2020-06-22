// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import {Button, Table, Skeleton, message, Select, Popconfirm} from 'antd';
import FormInput from '../../components/shared/FormInput';
import View from '../../components/shared/View';
import ApplicantModalDataView from './components/ApplicantModalDataView';
import ApplicantInputModal from './components/ApplicantInputModal';
import {EditOutlined, SaveOutlined} from '@ant-design/icons';
import {useLocation} from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext';
import axios from 'axios';
import {SUBMISSONS_API, TIMELINES_API, POSITIONS_API, config} from '../config';

type Props = {};
const {Option} = Select;

const initScore = () => ({
  interviewScore: 0,
  academicScore: 0,
  psikotesScore: 0,
});

function ApplicantsPage(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectUser, setSelectUser] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [data, setData] = React.useState([]);
  const [score, setScore] = React.useState(initScore());
  const [activeTab, setActiveTab] = React.useState<
    | 'APPLLICANTS'
    | 'ACADEMIC_SCORE'
    | 'PSIKOTEST_SCORE'
    | 'INTERVIEW_SCORE'
    | 'AGREEMENT'
  >('APPLLICANTS');
  const [showModal, setShowModal] = React.useState(false);
  const [showModalInput, setShowModalInput] = React.useState(false);
  const [singleData, setSingleData] = React.useState({});
  const regexPhone = /^[0-9]*$/;
  const location = useLocation();

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectUser(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record) => {
      return {
        fullName: record.fullName,
      };
    },
  };

  const handleChangeInput = (event) => {
    // const value = event.target && event.target.value;

    // if (regexPhone.test(value)) {
    //   setFormData((state) => ({
    //     ...state,
    //     nip: value,
    //   }));
    // }
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    if (regexPhone.test(value)) {
      console.log('ANJAYY');
      setScore((state) => ({
        ...state,
        [name]: parseInt(value),
      }));
    }
  };

  const handleUpdateStatus = async (statusId) => {
    try {
      const data = {
        applicants: [],
        updatedStatus: statusId,
      };
      setIsSubmitting(true);
      const URL = SUBMISSONS_API.updateStatus;
      const method = 'PUT';
      const response = await axios[method](URL, data, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (id) => {
    try {
      const scoreData = {
        score,
      };
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatusApplicant = async (statusID) => {
    try {
      const data = {
        applicants: selectUser,
        updatedStatus: statusID,
      };
      setIsSubmitting(true);
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
        if (activeTab === 'INTERVIEW_SCORE') handleFetchSubmissions(3);
        if (activeTab === 'AGREEMENT') handleFetchSubmissions(4);
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
              interviewScore: 0,
              academicScore: 0,
              psikotesScore: 0,
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
      render: (text) => {
        const getSingleData = appState.submissions.filter(
          (data) => data.fullName === text
        );

        return (
          <a
            onClick={() => {
              setShowModal(true);
              setSingleData(getSingleData[0]);
            }}>
            {text}
          </a>
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
            onClick={() => {
              console.log(record);
            }}>
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

  const agreementColumn = {
    title: 'Kontrak',
    key: 'contract',
    render: (record) => {
      console.log(record.passed);
      if (record.passed === 2) {
        return (
          <span>
            <Button size="small" type="dashed">
              Lulus
            </Button>
          </span>
        );
      }
      if (record.passed === 1) {
        return (
          <span>
            <Button size="small" type="dashed">
              Tidak Lulus
            </Button>
          </span>
        );
      }
      if (record.passed === 0) {
        return (
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin menyetujui pelamar ini?"
              onConfirm={() =>
                handleUpdateStatusAgreement(record.id, 2, record.positionId)
              }
              onCancel={() =>
                handleUpdateStatusAgreement(record.id, 1, record.positionId)
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

  const editScore = (indexNumber, condition, scoreName, scoreValue) => {
    dispatchApp({
      type: 'SET_EDITING_SCORE_SUBMISSION',
      payload: {indexNumber, condition, scoreName, scoreValue},
    });
  };

  const handleSearch = () => {
    const newData = appState.submissions.filter((applicant) => {
      return applicant.fullName == searchKeyword;
    });
    console.log(newData, 'this is new data');
    setData(newData);
  };

  const handleUpdateStatusAgreement = async (idUser, idStatus, positionId) => {
    try {
      const data = {
        id: idUser,
        updatedStatus: idStatus,
        positionId,
      };
      setIsSubmitting(true);
      const URL = SUBMISSONS_API.updateStatusAgreement;
      const method = 'put';
      const response = await axios[method](URL, data, {
        headers: config.headerConfig,
      });
      const result = response.data;
      if (result.success) {
        message.success(`Data telah berhasil diperbarui`);
        handleFetchSubmissions(3);
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

  const handleFetchTimelines = async () => {
    try {
      dispatchApp({type: 'FETCH_TIMELINES_APPLICANT_INIT'});

      const response = await axios.get(TIMELINES_API.getAll);
      const result = response.data;

      if (result.success) {
        console.log(result.data, 'TRASDSADSADSAD');
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
          `?filter=status&filterValue=${statusSubmission}${
            idPeriode ? `&periode=${idPeriode}` : ''
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
              },
            };
            return item;
          });
          const promiseDone = Promise.all(data);
          return promiseDone;
        };
        const positionsData = await fetchPosition();
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
  } else if (activeTab === 'INTERVIEW_SCORE') {
    columns = defaultColumns.concat([
      academiScoreColumn,
      psikotestScoreColumn,
      interviewScoreColumn,
    ]);
  } else if (activeTab === 'AGREEMENT') {
    columns = defaultColumns.concat([
      academiScoreColumn,
      psikotestScoreColumn,
      interviewScoreColumn,
      agreementColumn,
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
      if (activeTab === 'INTERVIEW_SCORE') {
        handleFetchSubmissions(3, query);
      }
      if (activeTab === 'AGREEMENT') {
        handleFetchSubmissions(4, query);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab]
  );

  return (
    <React.Fragment>
      <Header
        title="Pelamar"
        rightContent={
          <View style={{width: '400px'}}>
            <View flexDirection="row">
              <FormInput
                value={searchKeyword}
                onChange={(event) => {
                  const name = event.target && event.target.name;
                  const value = event.target && event.target.value;
                  setSearchKeyword(value);
                }}
                placeholder="Pencarian berdasarkan nama"
              />
              <View marginLeft={8}>
                <Button onClick={handleSearch} type="primary">
                  Cari
                </Button>
              </View>
              <View marginLeft={8}>
                <Button
                  onClick={() => {
                    setData(appState.submissions);
                    setSearchKeyword('');
                  }}
                  type="default">
                  Reset
                </Button>
              </View>
            </View>
          </View>
        }></Header>

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
              if (activeTab === 'INTERVIEW_SCORE') {
                handleFetchSubmissions(3, null);
              }
              if (activeTab === 'AGREEMENT') {
                handleFetchSubmissions(4, null);
              }
            }
            if (activeTab === 'APPLLICANTS')
              handleFetchSubmissions(0, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'ACADEMIC_SCORE')
              handleFetchSubmissions(1, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'PSIKOTEST_SCORE')
              handleFetchSubmissions(2, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'INTERVIEW_SCORE')
              handleFetchSubmissions(3, idPeriode === 'ALL' ? null : idPeriode);

            if (activeTab === 'AGREEMENT')
              handleFetchSubmissions(4, idPeriode === 'ALL' ? null : idPeriode);
          }}
          name="lastEducation">
          <Option value="ALL">Semua periode</Option>
          {appState.dataTimelines.map((data) => (
            <Option value={data.id}>{data.title}</Option>
          ))}
        </Select>
      </View>
      <View marginY={14} style={{width: '600px'}}>
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
          type={activeTab === 'INTERVIEW_SCORE' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('INTERVIEW_SCORE')}>
          Wawancara
        </Button>
        <Button
          type={activeTab === 'AGREEMENT' ? 'dashed' : 'link'}
          onClick={() => setActiveTab('AGREEMENT')}>
          Sudah Lulus
        </Button>
      </View>

      <View>
        <View marginBottom={16}>
          {activeTab !== 'AGREEMENT' ? (
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
                if (activeTab === 'INTERVIEW_SCORE') {
                  status = 4;
                }
                handleUpdateStatusApplicant(status);
              }}>
              Proses ke tahap selanjutnya
            </Button>
          ) : null}
        </View>

        {appState.loading ? (
          <Skeleton />
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
