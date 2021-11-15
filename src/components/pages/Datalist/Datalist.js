import React, { useState } from 'react';

const Datalist = ({ employees }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [filteredByDayOffList, setFilteredByDayOffList] = useState([]);

  const onSearchChange = e => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = employees.filter(
      employee =>
        employee.familyName.toLowerCase() === searchTerm ||
        employee.employeeId.toLowerCase() === searchTerm ||
        employee.department.toLowerCase() === searchTerm
    );
    setFilteredList(filtered);
  };

  const onDaySearchChange = e => {
    const searchTerm = parseInt(e.target.value);
    const filtered = employees.filter(
      employee =>
        parseInt(employee.daysOffLimit) - parseInt(employee.daysOff) <
        searchTerm
    );
    setFilteredByDayOffList(filtered);
  };

  return (
    <div className='container-sm mt-5'>
      <h1>Adatlista</h1>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th scope='col'>Dolgozó azonosítója</th>
            <th scope='col'>Dolgozó teljes neve</th>
            <th scope='col'>Foglalkoztató egység</th>
          </tr>
          <tr>
            <th></th>
            <th scope='col'>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='search'
                  onChange={onSearchChange}
                />
              </div>
            </th>
            <th scope='col'>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='search'
                  onChange={onSearchChange}
                />
              </div>
            </th>
            <th scope='col'>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='search'
                  onChange={onSearchChange}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length !== 0 &&
            filteredList.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.employeeId}</td>
                <td>
                  {employee.familyName} {employee.givenName}
                </td>
                <td>{employee.department}</td>
              </tr>
            ))}
          {filteredByDayOffList.length !== 0 &&
            filteredByDayOffList.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.employeeId}</td>
                <td>
                  {employee.familyName} {employee.givenName}
                </td>
                <td>{employee.department}</td>
              </tr>
            ))}

          {filteredList.length === 0 &&
            filteredByDayOffList.length === 0 &&
            employees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.employeeId}</td>
                <td>
                  {employee.familyName} {employee.givenName}
                </td>
                <td>{employee.department}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='mb-3'>
        <label htmlFor='search' className='form-label'>
          Dolgozók akiknek kevesebb szabadságuk van, mint
        </label>
        <input
          type='number'
          className='form-control'
          id='search'
          onChange={onDaySearchChange}
        />
      </div>
    </div>
  );
};

export default Datalist;
