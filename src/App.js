import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Departments from './components/pages/Departments/Departments';
import NewDepartment from './components/pages/NewDepartment/NewDepartment';
import EditDepartment from './components/pages/EditDepartment/EditDepartment';
import Employees from './components/pages/Employees/Employees';
import NewEmployee from './components/pages/NewEmployee/NewEmployee';
import EditEmployee from './components/pages/EditEmployee/EditEmployee';
import Datalist from './components/pages/Datalist/Datalist';
import './App.scss';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState('');
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');

  // only runs once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem('storedEmployees')) {
      setEmployees(JSON.parse(localStorage.getItem('storedEmployees')));
    }
  }, []);

  // runs every time our employees state changes
  useEffect(() => {
    localStorage.setItem('storedEmployees', JSON.stringify(employees));
  }, [employees]);

  // only runs once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem('storedDepartments')) {
      setDepartments(JSON.parse(localStorage.getItem('storedDepartments')));
    }
  }, []);

  // runs every time our employees state changes
  useEffect(() => {
    localStorage.setItem('storedDepartments', JSON.stringify(departments));
  }, [departments]);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/departments'
          element={
            <Departments
              department={department}
              setDepartment={setDepartment}
              departments={departments}
              setDepartments={setDepartments}
            />
          }
        />
        <Route
          path='/departments/new'
          element={
            <NewDepartment
              department={department}
              setDepartment={setDepartment}
              departments={departments}
              setDepartments={setDepartments}
            />
          }
        />
        <Route
          path='/departments/edit/:id'
          element={
            <EditDepartment
              department={department}
              setDepartment={setDepartment}
              departments={departments}
              setDepartments={setDepartments}
            />
          }
        />
        <Route
          path='/employees'
          element={
            <Employees
              employee={employee}
              setEmployee={setEmployee}
              employees={employees}
              setEmployees={setEmployees}
            />
          }
        />
        <Route
          path='/employees/new'
          element={
            <NewEmployee
              employee={employee}
              departments={departments}
              employees={employees}
              setEmployees={setEmployees}
            />
          }
        />
        <Route
          path='/employees/edit/:id'
          element={
            <EditEmployee
              departments={departments}
              employee={employee}
              setEmployee={setEmployee}
              employees={employees}
              setEmployees={setEmployees}
            />
          }
        />
        <Route path='/datalist' element={<Datalist employees={employees} />} />
      </Routes>
    </div>
  );
};

export default App;
