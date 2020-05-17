// @flow
const BASE_URL = 'https://us-central1-si-rekrut.cloudfunctions.net/api';
export const POSITIONS_API = {
  getAll: `${BASE_URL}/positions`,
  getSingle: (id: string) => `${BASE_URL}/positions/${id}`,
  post: `${BASE_URL}/positions`,
  update: (id: string) => `${BASE_URL}/positions/${id}`,
  delete: (id: string) => `${BASE_URL}/positions/${id}`,
};

export const STUDY_PROGRAMS_API = {
  getAll: `${BASE_URL}/study_programs`,
  getSingle: (id: string) => `${BASE_URL}/study_programs/${id}`,
  post: `${BASE_URL}/study_programs`,
  update: (id: string) => `${BASE_URL}/study_programs/${id}`,
  delete: (id: string) => `${BASE_URL}/study_programs/${id}`,
};
const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1YzlhZWJlMjM0ZGE2MDE2YmQ3Yjk0OTE2OGI4Y2Q1YjRlYzllZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ktcmVrcnV0IiwiYXVkIjoic2ktcmVrcnV0IiwiYXV0aF90aW1lIjoxNTg5NzU0NTI0LCJ1c2VyX2lkIjoidlRPdFBDdjY1MVN2Uk1oVnlYTUNkMVFNUEdzMiIsInN1YiI6InZUT3RQQ3Y2NTFTdlJNaFZ5WE1DZDFRTVBHczIiLCJpYXQiOjE1ODk3NTQ1MjQsImV4cCI6MTU4OTc1ODEyNCwiZW1haWwiOiJmYWRsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmFkbGlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.J6_AZzMg96QyLwZOdi6lAx_nrOL6h-AwLKMVcIo3xGK8r5vAOyP_OwUp-bLd7N8j4V1KsH04wHB1iovZRAs32XS-B0-Wib4SB_I2C9s7WxLDn0MwZ5mKCYvpytUXqgR7hTqWMrQjr7ZEmcr4q-5ODQlsXXs1Y-Jm7q9fACxFuJCGYOsk-FJoEcpXhhvog2WCYloZW7TbOcY53QPKvhurDOQ2Dk-48relgVzMX30rBMQabKfN3kHMi_ntbPTM2CyqsHM1K8Y_-SJKQREOYJVo_UKrHBQgQnCrhfK0v-MNyBxE2R66xLUDVCcXq1AIrYY1g7NFA0jGaR3VIsW5N3V0bw';

export const config = {
  headerConfig: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
  app: {
    strataOptions: [
      {
        key: 'D3',
        label: 'Diploma',
        value: 'DIPLOMA',
      },
      {
        key: 'S1',
        label: 'Sarjana',
        value: 'SARJANA',
      },
      {
        key: 'S2',
        label: 'Magister',
        value: 'MAGISTER',
      },
      {
        key: 'S3',
        label: 'Doktor',
        value: 'DOKTOR',
      },
    ],
  },
};
