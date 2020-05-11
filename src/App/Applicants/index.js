// @flow
import * as React from 'react';
import Header from '../../components/commons/Header';
import {Button, Table, Typography} from 'antd';
import FormInput from '../../components/shared/FormInput';
import View from '../../components/shared/View';
import ApplicantModalDataView from './components/ApplicantModalDataView';

type Props = {};

const data = [
  {
    key: '1',
    name: 'John Brown',
    position: 'Staff IT Sisfo',
  },
  {
    key: '2',
    name: 'Jim Green',
    position: 'Staff Admin LAC',
  },
  {
    key: '3',
    name: 'Joe Black',
    position: 'Dosen D3RPLA',
  },
  {
    key: '4',
    name: 'Disabled User',
    position: 'Dosen D3 Akuntansi',
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
  const [activeTab, setActiveTab] = React.useState<
    | 'APPLLICANTS'
    | 'ACADEMIC_SCORE'
    | 'PSIKOTEST_SCORE'
    | 'INTERVIEW_SCORE'
    | 'AGREEMENT'
  >('APPLLICANTS');
  const [showModal, setShowModal] = React.useState(false);

  let columns = [];

  let defaultColumns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Posisi',
      dataIndex: 'position',
    },
  ];

  const academiScoreColumn = {
    title: 'Nilai Akademik',
    key: 'academic_score',
    render: (record) => {
      return (
        <span>
          <Button size="small" type="link" onClick={() => {}}>
            Isi Nilai
          </Button>
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
          <Button size="small" type="link" onClick={() => {}}>
            Isi Nilai
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
            Isi Nilai
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

        <ApplicantModalDataView
          visible={showModal}
          onClose={() => setShowModal(false)}
        />

        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setShowModal(true);
              },
            };
          }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </View>
    </React.Fragment>
  );
}

export default ApplicantsPage;
