import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import InputFieldSet from '../InputFieldSet/InputFieldSet';
import {
  isFieldEmpty,
  isIdFormatValid,
  idExists,
} from '../../../utils/validators';
import {
  isFormValid,
  handleInputChange,
  handleInputBlur,
} from '../../../utils/form-validation';

const DepartmentForm = ({
  type,
  id,
  employee,
  setEmployee,
  employees,
  setEmployees,
  departments,
  setDepartments,
  department,
  setDepartment,
}) => {
  const [formData, setFormData] = useState(
    type === 'edit'
      ? department
      : {
          departmentId: '',
          departmentName: '',
        }
  );
  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    departmentId: useRef(),
    departmentName: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    departmentIdFormat: `Az azonosító nem megfelelő formátumú (2 kis - vagy nagybetű és 4 szám)`,
    idNotUnique: `Ez az azonosító már létezik`,
  });

  const [formErrors, setFormErrors] = useState({
    departmentId: '',
    departmentName: '',
  });

  const messageTypes = Object.freeze({
    success: `Az adatok sikeresen mentésre kerültek`,
    fail: `Az adatok mentése sikertelen`,
  });

  const validators = {
    departmentId: {
      required: isFieldEmpty,
      departmentIdFormat: isIdFormatValid,
      idNotUnique: idExists,
    },
    departmentName: {
      required: isFieldEmpty,
    },
  };

  const handleSubmit = e => {
    e.preventDefault();

    setAlert('');
    setFormErrors({
      departmentId: '',
      departmentName: '',
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
      if (type === 'new') {
        setDepartments(prev => prev.concat(formData));
        console.log('departments', departments);

        setFormData({
          departmentId: '',
          departmentName: '',
        });
        setAlert({ alertType: 'success', message: messageTypes.success });
      }
      if (type === 'edit') {
        const filtered = departments.filter(value => value.departmentId !== id);

        setDepartments(filtered);
        setDepartments(prev => [...prev, formData]);
        setDepartment('');
        setAlert({ alertType: 'success', message: messageTypes.success });
      }
    } else {
      setFormWasValidated(true);
    }
  };
  return (
    <div className='container-sm mt-5'>
      <NavLink to='/departments'>
        <button type='button' className='btn btn-dark mb-5'>
          Vissza
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
          name='departmentId'
          value={formData.departmentId}
          labelText='Azonosító *'
          type='text'
          placeholder='pl: ab1234'
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
          reference={references.departmentId}
          error={formErrors.departmentId}
          required
        />
        <InputFieldSet
          name='departmentName'
          value={formData.departmentName}
          labelText='Név *'
          type='text'
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
          reference={references.departmentName}
          error={formErrors.departmentName}
          required
        />
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>
        <div className='container-l'>
          <button type='submit' className='btn btn-warning mt-5'>
            Mentés
          </button>{' '}
          <NavLink to='/departments'>
            <button type='button' className='btn btn-dark mt-5'>
              Mégsem
            </button>{' '}
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
