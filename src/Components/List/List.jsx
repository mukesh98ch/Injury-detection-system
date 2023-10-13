
import React, { useState, useEffect } from 'react';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../../Utils/localStorage';
import './List.css';

function InjuryReportList() {
  const [reports, setReports] = useState([]);
  const [sortField, setSortField] = useState('dateTimeOfInjury');
  const [searchName, setSearchName] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  useEffect(() => {
    const savedReports = getDataFromLocalStorage('injuryReports');
    if (savedReports) {
      setReports(savedReports);
    }
  }, []);

  const handleDelete = (reportId) => {
    const updatedReports = reports.filter((report) => report.id !== reportId);
    setReports(updatedReports);
    saveDataToLocalStorage('injuryReports', updatedReports);
  };

  const sortedReports = reports
    .filter((report) => report.reporter.includes(searchName))
    .filter((report) => (!startDateFilter || report.dateTimeOfInjury >= startDateFilter))
    .filter((report) => (!endDateFilter || report.dateTimeOfInjury <= endDateFilter))
    .sort((a, b) => {
      if (sortField === 'dateTimeOfInjury') {
        return a.dateTimeOfInjury.localeCompare(b.dateTimeOfInjury);
      } else if (sortField === 'reporter') {
        return a.reporter.localeCompare(b.reporter);
      }
    });

  return (
    <div className="injury-reports">
      <h2>Injury Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date & Time of Injury</th>
            <th>Area of Injury</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.map((report) => (
            <tr key={report.id}>
              <td>{report.reporter}</td>
              <td>{report.dateTimeOfInjury}</td>
              <td>
                <ul>
                  {report.injuryAreas.map((area) => (
                    <li key={area.id}>
                      {area.label}: {area.area}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleDelete(report.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InjuryReportList;
