// @flow
import type {StudyProgramsType, PositionsType} from './../types/App.flow';

type State = {
  loading: boolean,
  error: ?Object,
  studyPrograms: StudyProgramsType,
  positions: PositionsType,
};

type ActionList =
  | 'FETCH_STUDY_PROGRAMS_INIT'
  | 'FETCH_STUDY_PROGRAMS_SUCCESS'
  | 'FETCH_STUDY_PROGRAMS_FAILURE'
  | 'FETCH_POSITIONS_INIT'
  | 'FETCH_POSITIONS_SUCCESS'
  | 'FETCH_POSITIONS_FAILURE';

type Action = {
  type: ActionList,
  payload?: Object,
};

export const initState = {
  loading: false,
  error: null,
  studyPrograms: [],
  positions: [],
};

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_STUDY_PROGRAMS_INIT': {
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

    case 'FETCH_STUDY_PROGRAMS_FAILURE': {
      console.log('❌ error:=', action.payload.error);

      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case 'FETCH_POSITIONS_INIT': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_POSITIONS_SUCCESS': {
      return {
        ...state,
        positions: action.payload.positions,
        loading: false,
        error: null,
      };
    }

    case 'FETCH_POSITIONS_FAILURE': {
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
