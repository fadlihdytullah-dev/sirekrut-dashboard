// @flow

export type StudyProgramType = {
  id: string,
  name: string,
};
export type CompactStudyProgramType = {
  id: string,
  name: string,
};
export type StudyProgramInputType = {
  name: string,
  nip: string,
};
export type StudyProgramsType = Array<StudyProgramType>;

export type GraduateType = 'DIPLOMA' | 'SARJANA' | 'MAGISTER' | 'DOKTOR';

export type PositionType = {
  name: string,
  minimumGPA: number,
  minimumGraduate: GraduateType,
  studyPrograms: 'ALL' | Array<string>,
  details: string,
  createdBy?: string,
  createdAt?: string,
  updatedBy?: string,
  updatedAt?: string,
};
export type PositionInputType = {
  name: string,
  minimumGPA: number,
  minimumGraduate: GraduateType,
  studyPrograms: 'ALL' | Array<CompactStudyProgramType>,
  details: string,
  nip: string,
};
export type PositionsType = Array<Position>;
