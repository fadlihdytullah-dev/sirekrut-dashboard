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
  updateStatus: `${LOCAL_BASE_URL}/submissions-update`,
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
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ktcmVrcnV0IiwiYXVkIjoic2ktcmVrcnV0IiwiYXV0aF90aW1lIjoxNTkxODc4Njg1LCJ1c2VyX2lkIjoidlRPdFBDdjY1MVN2Uk1oVnlYTUNkMVFNUEdzMiIsInN1YiI6InZUT3RQQ3Y2NTFTdlJNaFZ5WE1DZDFRTVBHczIiLCJpYXQiOjE1OTE4Nzg2ODUsImV4cCI6MTU5MTg4MjI4NSwiZW1haWwiOiJmYWRsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmFkbGlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.koQZMUWqgqYzLC7CtYSuo0AlQvwIDQezXtN6lHDHgWmqVG_BvFjSG12wej3NMw9pciqFXE-aRukRdVn4ODhsNuUjowb-Vn6hx57uPhBU-xa3GVwH58l4KCUJE_YPy5aKPjQ5-CHc3iFYBvE-69dFyNkxdjhGXk7moy4zVwDYBD5B2ySRKO0wkp_C1L4A1H-RAc6M_Wjf6JhFlRFGwZoAqHih4ooDJu6qupk0TR9CJM8jkpcWaRUazlIJKfrFBDezQl2RR6Rs3xn0xU9FOBb3WlZ6X4g_QpmRPg1QUv6toJlBmFvrbohwIuv3JdxQrAQ6I0SekFsH4DNXaHA4RZLhLw';

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
