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
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ktcmVrcnV0IiwiYXVkIjoic2ktcmVrcnV0IiwiYXV0aF90aW1lIjoxNTkxNzg0NzY2LCJ1c2VyX2lkIjoidlRPdFBDdjY1MVN2Uk1oVnlYTUNkMVFNUEdzMiIsInN1YiI6InZUT3RQQ3Y2NTFTdlJNaFZ5WE1DZDFRTVBHczIiLCJpYXQiOjE1OTE3ODQ3NjYsImV4cCI6MTU5MTc4ODM2NiwiZW1haWwiOiJmYWRsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmFkbGlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.KuJWsnRisZLB5Zx7CVesvLLBFFKkxpom0iO6TUnqts8Jol_-7RutYjFrhqxKooBuxD4xQx9EcUFXa77x3LZTRw5JWc9KKCdwevGfMoJ5Beq9Ex4hfWNqUj0HF_cCW7rqYuBIBOJASaxZ37w86gVTuIeq3tn-P5NvMGmEvmqWU3nUgJzrCYVKYbK7dS9wpEFyGJ3UNvortpvAAv83dvkRK7QoHAlTZTb-KT8dy2v8Idl6RpV14u8h3HuwChRgKFk8TFe15YFOfABv-u7CeRQeRlD19fD3BHd8eE2WFOdAK2wSgxtwR1rCp-GJw1pJTItEyY9TcAH8oCgIZ8PTmCgjAg';

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
