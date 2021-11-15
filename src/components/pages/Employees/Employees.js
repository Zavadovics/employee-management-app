import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import InputFieldSet from '../../common/InputFieldSet/InputFieldSet';
import { isFieldEmpty } from '../../../utils/validators';
import {
  isFormValid,
  handleInputChange,
  handleInputBlur,
} from '../../../utils/form-validation';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../common/DeleteModal/DeleteModal';

const Employees = ({ employee, setEmployee, employees, setEmployees }) => {
  let navigate = useNavigate();
  const deleteModalRef = useRef();
  const state = {
    button: 1,
  };

  const [formData, setFormData] = useState({
    employeeId: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    employeeId: useRef(),
  };

  const [formErrors, setFormErrors] = useState({
    employeeId: '',
  });

  const messageTypes = Object.freeze({
    success: `Az adatok sikeresen mentésre kerültek`,
    fail: `Az adatok mentése sikertelen`,
    deleteSuccess: `Az adatok törlése sikeres`,
  });

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
  });

  const validators = {
    employeeId: {
      required: isFieldEmpty,
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      employeeId: '',
    });
    setFormWasValidated(false);
    const isValid = isFormValid(
      formData,
      setFormErrors,
      validators,
      references,
      formErrorTypes
    );
    if (isValid) {
      const foundEmployee = employees.filter(
        employee => employee.employeeId === formData.employeeId
      )[0];
      setEmployee(foundEmployee);
      if (state.button === 1) {
        navigate(`/employees/edit/${formData.employeeId}`);
      }
    } else {
      console.log('no input');
      setFormWasValidated(false);
    }
  };

  const handleDeleteConfirm = () => {
    const remainedEmployees = employees.filter(
      employee => employee.employeeId !== formData.employeeId
    );
    setEmployees(remainedEmployees);
    setAlert({ alertType: 'success', message: messageTypes.deleteSuccess });
    setEmployee('');
  };

  return (
    <div className='container-sm mt-5'>
      <h1>Dolgozók</h1>
      <NavLink to='/employees/new'>
        <button type='button' className='btn btn-dark mt-5'>
          Létrehozás
        </button>
      </NavLink>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`needs-validation ${
          formWasValidated ? 'was-validated' : ''
        }`}
      >
        <InputFieldSet
          name='employeeId'
          value={formData.employeeId}
          type='select'
          employeeOptions={employees}
          onChange={e => {
            handleInputChange(e, formData, setFormData);
          }}
          onBlur={e => {
            handleInputBlur(
              e,
              formData,
              setFormErrors,
              validators,
              references,
              formErrorTypes
            );
          }}
          reference={references.employeeId}
          error={formErrors.employeeId}
          required
        />
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>
        <div className='container-l mt-5'>
          <button
            type='submit'
            onClick={() => (state.button = 1)}
            className='btn btn-warning mt-5'
          >
            Módosítás
          </button>
          {formData.employeeId === '' ? (
            <button type='submit' className='btn btn-danger mt-5'>
              Törlés
            </button>
          ) : (
            <button
              type='submit'
              onClick={() => (state.button = 2)}
              className='btn btn-danger mt-5'
              data-bs-target='#myModal'
              data-bs-toggle='modal'
              data-id={formData.employeeId}
            >
              Törlés
            </button>
          )}
        </div>
      </form>
      <DeleteModal
        handleDeleteConfirm={handleDeleteConfirm}
        deleteModalRef={deleteModalRef}
        type='deleteEmployee'
      />
    </div>
  );
};

export default Employees;
