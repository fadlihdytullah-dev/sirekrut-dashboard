// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import {Button, Table, Skeleton, message} from 'antd';
import FormInput from '../../components/shared/FormInput';
import View from '../../components/shared/View';
import ApplicantModalDataView from './components/ApplicantModalDataView';
import ApplicantInputModal from './components/ApplicantInputModal';
import {EditOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext';
import axios from 'axios';
import {SUBMISSONS_API, POSITIONS_API, config} from '../config';

type Props = {};

const data = [
  {
    id: 'FLBTLgVnp1M6RMwU4ZzN',
    fullName: 'Darijo Aurelya',
    _360Score: 0,
    status: 0,
    lastEducation: 'S2',
    cvFile: null,
    email: 'ainayy@gmail.com',
    address: 'Jl. Bingo',
    toeflFile: null,
    dateOfBirth: '20 January 2001',
    profilePicture: '',
    score: {
      psikotesScore: 0,
      interviewScore: 0,
      academicScore: 0,
    },
    _360File: null,
    phoneNumber: '082232322323',
    toeflScore: 488,
    passed: false,
    gender: 'Perempuan',
    createdAt: '2020-06-03T06:14:07.615Z',
    originFrom: 'Sumedang',
    positionId: 'hEXMsoTDcTvMufy7UaBg',
  },
  {
    id: 'ZE6wlxdYqE0XuJeTZ8Xt',
    status: 0,
    lastEducation: 'S2',
    cvFile: null,
    email: 'ainayy@gmail.com',
    address: 'Jl. Bingo',
    toeflFile: null,
    dateOfBirth: '20 January 2001',
    profilePicture: '',
    score: {
      psikotesScore: 0,
      interviewScore: 0,
      academicScore: 0,
    },
    _360File: null,
    phoneNumber: '082232322323',
    toeflScore: 488,
    passed: false,
    gender: 'Perempuan',
    createdAt: '2020-06-03T06:14:00.151Z',
    originFrom: 'Sumedang',
    positionId: 'hEXMsoTDcTvMufy7UaBg',
    fullName: 'Kuncoro Aurelya',
    _360Score: 0,
  },
  {
    id: 'YQjyu77bTspGbeZZk7pH',
    lastEducation: 'S2',
    cvFile: null,
    email: 'ainayy@gmail.com',
    address: 'Jl. Bingo',
    toeflFile: null,
    dateOfBirth: '20 January 2001',
    profilePicture: '',
    score: {
      interviewScore: 0,
      academicScore: 0,
      psikotesScore: 0,
    },
    _360File: null,
    phoneNumber: '082232322323',
    toeflScore: 488,
    passed: false,
    gender: 'Perempuan',
    createdAt: '2020-06-03T06:13:42.585Z',
    originFrom: 'Sumedang',
    positionId: 'hEXMsoTDcTvMufy7UaBg',
    fullName: 'Xsss Aurelya',
    _360Score: 0,
    status: 0,
  },
];

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

function ApplicantsPage(props: Props) {
  const {appState, dispatchApp} = React.useContext(AppContext);
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
              console.log(record, 'ini single data');
              setShowModalInput(true);
              setSingleData(record);
            }}>
            0
          </Button>
          <input type="text" value={0} style={{display: 'none'}} />
          <EditOutlined />
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
          <Button
            size="small"
            type="link"
            onClick={() => {
              console.log(record, 'ini single data');
              setShowModalInput(true);
              setSingleData(record);
            }}>
            0
          </Button>
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
          <Button size="small" type="link" onClick={() => {}}>
            0
          </Button>
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
            const item = {...dat, positionName: res.data.data.name};
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
      // handleFetchSubmissions(0);
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
            dataSource={data}
            // dataSource={appState.submissions}
          />
        )}
      </View>
    </React.Fragment>
  );
}

export default ApplicantsPage;
