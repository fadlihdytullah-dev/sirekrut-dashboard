// @flow
import type {
  UsersType,
  PositionsType,
  TimelinesType,
  StudyProgramsType,
} from './../types/App.flow';

type State = {
  loading: boolean,
  error: ?Object,
  studyPrograms: StudyProgramsType,
  positions: PositionsType,
  users: UsersType,
  dataTimelines: TimelinesType,
};

type ActionList =
  | 'FETCH_STUDY_PROGRAMS_INIT'
  | 'FETCH_STUDY_PROGRAMS_SUCCESS'
  | 'FETCH_STUDY_PROGRAMS_FAILURE'
  | 'FETCH_POSITIONS_INIT'
  | 'FETCH_POSITIONS_SUCCESS'
  | 'FETCH_POSITIONS_FAILURE'
  | 'FETCH_USERS_INIT'
  | 'FETCH_USERS_SUCCESS'
  | 'FETCH_USERS_FAILURE'
  | 'USER_LOGIN_INIT'
  | 'USER_LOGIN_SUCCESS'
  | 'USER_LOGIN_FAILURE'
  | 'FETCH_TIMELINES_FAILURE'
  | 'FETCH_TIMELINES_APPLICANT_INIT'
  | 'FETCH_TIMELINES_INIT'
  | 'FETCH_TIMELINES_APPLICANT_SUCCESS'
  | 'FETCH_TIMELINES_APPLICANT_FAILURE'
  | 'FETCH_TIMELINES_SUCCESS'
  | 'FETCH_SUBMISSIONS_INIT'
  | 'SET_EDITING_SCORE_SUBMISSION'
  | 'FETCH_SUBMISSIONS_FAILURE';

type Action = {
  type: ActionList,
  payload?: *,
};

export const initState = {
  loading: false,
  isLogin: false,
  error: null,
  studyPrograms: [],
  submissions: [],
  users: [],
  dataTimelines: [],
  positions: [],
};

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_USERS_INIT': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_USERS_SUCCESS': {
      return {
        ...state,
        users: action.payload.users,
        loading: false,
        error: null,
      };
    }

    case 'FETCH_USERS_FAILURE': {
      console.log('❌ error:=', action.payload.error);

      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case 'USER_LOGIN_INIT': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        isLogin: true,
        loading: false,
        error: null,
      };
    }

    case 'USER_LOGIN_FAILURE': {
      console.log('❌ error:=', action.payload.error);

      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload.error,
      };
    }
    case 'FETCH_TIMELINES_INIT': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_TIMELINES_SUCCESS': {
      return {
        ...state,
        dataTimelines: action.payload.dataTimelines,
        loading: false,
        error: null,
      };
    }

    case 'FETCH_TIMELINES_FAILURE': {
      console.log('❌ error:=', action.payload.error);

      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case 'FETCH_TIMELINES_APPLICANT_INIT': {
      return {
        ...state,
      };
    }

    case 'FETCH_TIMELINES_APPLICANT_SUCCESS': {
      return {
        ...state,
        dataTimelines: action.payload.dataTimelines,

        error: null,
      };
    }

    case 'FETCH_TIMELINES_APPLICANT_FAILURE': {
      console.log('❌ error:=', action.payload.error);

      return {
        ...state,

        error: action.payload.error,
      };
    }
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

    // FETCH_SUBMISSIONS_INIT
    case 'FETCH_SUBMISSIONS_INIT': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_SUBMISSIONS_SUCCESS': {
      return {
        ...state,
        submissions: action.payload.submissions,
        loading: false,
        error: null,
      };
    }

    case 'SET_EDITING_SCORE_SUBMISSION': {
      state.submissions[action.payload.indexNumber].isEditing[
        action.payload.scoreName
      ] = action.payload.condition;
      state.submissions[action.payload.indexNumber]['score'][
        action.payload.scoreName
      ] = action.payload.scoreValue;

      return {
        ...state,
        submissions: state.submissions,
        loading: false,
        error: null,
      };
    }

    case 'FETCH_SUBMISSIONS_FAILURE': {
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
