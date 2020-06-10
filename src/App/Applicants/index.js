// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import {Button, Table, Skeleton, message} from 'antd';
import FormInput from '../../components/shared/FormInput';
import View from '../../components/shared/View';
import ApplicantModalDataView from './components/ApplicantModalDataView';
import ApplicantInputModal from './components/ApplicantInputModal';
import {EditOutlined, SaveOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext';
import axios from 'axios';
import {SUBMISSONS_API, POSITIONS_API, config} from '../config';

type Props = {};

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    name: record.name,
  }),
};

const initScore = () => ({
  interviewScore: 0,
  academicScore: 0,
  psikotesScore: 0,
});

function ApplicantsPage(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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

  const handleChangeInput = (event) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    setScore((state) => ({
      ...state,
      [name]: parseInt(value),
    }));
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
  const buttonEditScore = (record, scoreTitle) => {
    let disabled;
    if (isEditing) {
      if (!record.isEditing) {
        disabled = true;
      }
    }

    return (
      <Button
        type="primary"
        icon={record.isEditing ? <SaveOutlined /> : <EditOutlined />}
        size={'small'}
        disabled={disabled}
        onClick={() => {
          setIsEditing(!isEditing);
          const indexNumber = appState.submissions.findIndex(
            (data) => data.id === record.id
          );
          if (record.isEditing) {
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
            {record.isEditing ? (
              <input
                type="text"
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
            {record.isEditing ? (
              <input
                type="text"
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
            {record.isEditing ? (
              <input
                type="text"
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
      return (
        <span>
          <Button size="small" type="link" onClick={() => {}}>
            Menyetujui
          </Button>
          <Button size="small" type="link" danger onClick={() => {}}>
            Menolak
          </Button>
        </span>
      );
    },
  };

  const editScore = (indexNumber, condition, scoreName, scoreValue) => {
    dispatchApp({
      type: 'SET_EDITING_SCORE_SUBMISSION',
      payload: {indexNumber, condition, scoreName, scoreValue},
    });
  };

  const handleFetchSubmissions = async (statusSubmission) => {
    try {
      dispatchApp({type: 'FETCH_SUBMISSIONS_INIT'});
      const response = await axios.get(SUBMISSONS_API.getAll);
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
              isEditing: false,
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

  React.useEffect(
    () => {
      handleFetchSubmissions(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <React.Fragment>
      <Header
        title="Pelamar"
        rightContent={
          <View style={{width: '400px'}}>
            <View flexDirection="row">
              <FormInput placeholder="Pencarian berdasarkan nama" />
              <View marginLeft={8}>
                <Button type="primary">Cari</Button>
              </View>
            </View>
          </View>
        }
      />
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

      <View marginY={24} style={{width: '600px'}}>
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
          <Button>Proses ke tahap selanjutnya</Button>
        </View>

        {appState.loading ? (
          <Skeleton />
        ) : (
          <Table
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       setSingleData(record);
            //       setShowModal(true);
            //     },
            //   };
            // }}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            // dataSource={data}
            dataSource={appState.submissions}
          />
        )}
      </View>
    </React.Fragment>
  );
}

export default ApplicantsPage;
