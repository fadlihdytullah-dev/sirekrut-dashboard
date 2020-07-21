// @flow
const BASE_URL = 'https://us-central1-si-rekrut.cloudfunctions.net/api';
const LOCAL_BASE_URL = 'http://localhost:5001/si-rekrut/us-central1/api';
export const POSITIONS_API = {
  getAll: `${BASE_URL}/positions`,
  getSingle: (id: string) => `${BASE_URL}/positions/${id}`,
  post: `${BASE_URL}/positions`,
  update: (id: string) => `${BASE_URL}/positions/${id}`,
  delete: (id: string) => `${BASE_URL}/positions/${id}`,
  changeStatus: (id: string) => `${BASE_URL}/positions/edit_status/${id}`,
};

export const SUBMISSONS_API = {
  getAll: `${BASE_URL}/submission`,
  getSingle: (id: string) => `${BASE_URL}/submission/${id}`,
  update: (id: string) => `${BASE_URL}/submission/${id}`,
  updateStatus: `${BASE_URL}/submissions-update`,
  updateStatusAgreement: `${BASE_URL}/submissions-update/agreement`,
  updateStatusDetermination: `${BASE_URL}/submissions-update/determination`,
};

export const AUTH_API = {
  login: `${BASE_URL}/login`,
  register: `${BASE_URL}/register`,
  get: `${BASE_URL}/users`,
  deleteUser: (idUser: string) => `${BASE_URL}/users/${idUser}`,
  changeStatus: (id: string) => `${BASE_URL}/users/${id}`,
};

export const STUDY_PROGRAMS_API = {
  getAll: `${BASE_URL}/study_programs`,
  getSingle: (id: string) => `${BASE_URL}/study_programs/${id}`,
  post: `${BASE_URL}/study_programs`,
  update: (id: string) => `${BASE_URL}/study_programs/${id}`,
  delete: (id: string) => `${BASE_URL}/study_programs/${id}`,
  changeStatus: (id: string) => `${BASE_URL}/study_programs/edit_status/${id}`,
};

export const FORM_CONF_API = {
  getConfig: `${BASE_URL}/forms-conf`,
  update: `${BASE_URL}/forms/conf`,
};

export const TIMELINES_API = {
  getAll: `${BASE_URL}/timelines`,
  getSingle: (id: string) => `${BASE_URL}/timelines/${id}`,
  post: `${BASE_URL}/timelines`,
  update: (id: string) => `${BASE_URL}/timelines/${id}`,
  delete: (id: string) => `${BASE_URL}/timelines/${id}`,
  changeStatus: (id: string) => `${BASE_URL}/timelines/edit_status/${id}`,
};

const AUTH_TOKEN = localStorage.getItem('token') || '';

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
