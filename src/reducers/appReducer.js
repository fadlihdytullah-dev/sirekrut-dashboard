// @flow
import type {StudyProgramsType} from './../types/App.flow';

type State = {
  loading: boolean,
  error: ?Object,
  studyPrograms: StudyProgramsType,
};

type StudyProgramAction =
  | 'FETCH_INIT_STUDY_PROGRAMS'
  | 'FETCH_STUDY_PROGRAMS_SUCCESS'
  | 'FETCH_STUDY_PROGRAM_FAILURE';

type ActionList = StudyProgramAction;

type Action = {
  type: ActionList,
  payload?: Object,
};

export const initState = {
  loading: false,
  error: null,
  studyPrograms: [],
};

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT_STUDY_PROGRAMS': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_STUDY_PROGRAMS_SUCCESS': {
      return {
        ...state,
        studyPrograms: action.payload.studyPrograms,
        loading: false,
        error: null,
      };
    }

    case 'FETCH_STUDY_PROGRAM_FAILURE': {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
};

export type AppState = State;
export type DispatchAction = (action: Action) => void;

export default appReducer;
