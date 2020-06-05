// @flow
const BASE_URL = 'https://us-central1-si-rekrut.cloudfunctions.net/api';
const LOCAL_BASE_URL = 'http://localhost:5001/si-rekrut/us-central1/api';
export const POSITIONS_API = {
  getAll: `${BASE_URL}/positions`,
  getSingle: (id: string) => `${BASE_URL}/positions/${id}`,
  post: `${BASE_URL}/positions`,
  update: (id: string) => `${BASE_URL}/positions/${id}`,
  delete: (id: string) => `${BASE_URL}/positions/${id}`,
};

export const SUBMISSONS_API = {
  getAll: `${LOCAL_BASE_URL}/submission`,
  getSingle: (id: string) => `${LOCAL_BASE_URL}/submission/${id}`,
  update: (id: string) => `${LOCAL_BASE_URL}/submission/${id}`,
};

export const STUDY_PROGRAMS_API = {
  getAll: `${BASE_URL}/study_programs`,
  getSingle: (id: string) => `${BASE_URL}/study_programs/${id}`,
  post: `${BASE_URL}/study_programs`,
  update: (id: string) => `${BASE_URL}/study_programs/${id}`,
  delete: (id: string) => `${BASE_URL}/study_programs/${id}`,
};

export const FORM_CONF_API = {
  getConfig: `${LOCAL_BASE_URL}/forms-conf`,
  update: `${LOCAL_BASE_URL}/forms/conf`,
};

export const TIMELINES_API = {
  getAll: `${BASE_URL}/timelines`,
  getSingle: (id: string) => `${BASE_URL}/study_programs/${id}`,
  post: `${BASE_URL}/timelines`,
  update: (id: string) => `${BASE_URL}/study_programs/${id}`,
  delete: (id: string) => `${BASE_URL}/study_programs/${id}`,
};

const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ktcmVrcnV0IiwiYXVkIjoic2ktcmVrcnV0IiwiYXV0aF90aW1lIjoxNTkxMzQxMjQ4LCJ1c2VyX2lkIjoidlRPdFBDdjY1MVN2Uk1oVnlYTUNkMVFNUEdzMiIsInN1YiI6InZUT3RQQ3Y2NTFTdlJNaFZ5WE1DZDFRTVBHczIiLCJpYXQiOjE1OTEzNDEyNDgsImV4cCI6MTU5MTM0NDg0OCwiZW1haWwiOiJmYWRsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmFkbGlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cxNWwQeH4NYJtZlPRAT8e6Rp89PPA9ZZ8tRwqFxLXjn2BZ_0EY90ZkLrWA0EaQFjN9L7ix8ellcXoNFdvvqFcOQr45C7uaB_FvD9_vyW_rIYJAyA79Livfq8k_vGjdpU9Phqpt5aiNiecfJIKD3f_C-ApIwTbUSeWI6c_jlkvGjsCSLtUWYyAdcVby6oaTEmFCFhMc2eN1HeeUomJWkwrHPUCDivaVs1ym4uia6IzBBsCuMxo4PuwW0k7WZ2R1rwlGaqSSVH80f51mQ-dnK70wf3BJXKg-yTxbu-PVad5ViZeMNS61FMNyTa4NryPnctjN_to4bMX3RIHkgwlJqIzg';

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
