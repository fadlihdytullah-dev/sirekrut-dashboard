// @flow
import React from 'react';
import {capitalize} from './../../Utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './table.css';

type Props = {
  data: any,
};

const PassedApplicantsTable = (props: Props) => {
  return (
    <div>
      <div>
        {props.data && props.data.length === 0 ? null : (
          <React.Fragment>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="pelamar"
              sheet="sheet1"
              buttonText="Export Data"
            />
            <table id="table-to-xls" className="zui-table">
              <thead>
                <tr>
                  <th>Nama Lengkap</th>
                  <th>Posisi</th>
                  <th>Tes Akademik</th>
                  <th>Tes Psikotes</th>
                  <th>Tes Microteaching</th>
                  <th>Tes Interview</th>
                  <th>Tes Orientasi</th>
                  <th>Email</th>
                  <th>Asal</th>
                  <th>Tanggal Lahir</th>
                  <th>Jenis Kelamin</th>
                  <th>Telepon</th>
                  <th>Pendidikan Terakhir</th>
                </tr>
              </thead>
              <tbody>
                {props.data &&
                  props.data.map((item) => (
                    <tr>
                      <td>{item.fullName}</td>
                      <td>{item.positionName}</td>
                      <td>{item.score.academicScore || 0}</td>
                      <td>{item.score.psikotesScore || 0}</td>
                      <td>{item.score.microteachingScore || 0}</td>
                      <td>{item.score.interviewScore || 0}</td>
                      <td>{item.score.orientationScore || 0}</td>
                      <td>{item.email}</td>
                      <td>{item.originFrom}</td>
                      <td>{item.dateOfBirth}</td>
                      <td>{item.gender}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{capitalize(item.lastEducation) || ''}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default PassedApplicantsTable;
