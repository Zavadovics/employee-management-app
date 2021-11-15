import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import InputFieldSet from '../InputFieldSet/InputFieldSet';
import {
  isValueNegative,
  isFieldEmpty,
  isIdFormatValid,
  isDateInFuture,
  idExists,
} from '../../../utils/validators';
import {
  isFormValid,
  handleInputChange,
  handleInputBlur,
} from '../../../utils/form-validation';

const EmployeeForm = ({
  type,
  id,
  employee,
  setEmployee,
  employees,
  setEmployees,
  departments,
}) => {
  const [formData, setFormData] = useState(
    type === 'edit'
      ? {
          employeeId: employee.employeeId,
          familyName: employee.familyName,
          givenName: employee.givenName,
          birthdate: employee.birthdate,
          daysOffLimit: employee.daysOffLimit,
          daysOffRemained:
            parseInt(employee.daysOffLimit) - parseInt(employee.daysOff),
          department: employee.department,
        }
      : {
          employeeId: '',
          familyName: '',
          givenName: '',
          birthdate: '',
          daysOffLimit: '',
          daysOffRemained: '',
          department: '',
        }
  );
  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    employeeId: useRef(),
    familyName: useRef(),
    givenName: useRef(),
    birthdate: useRef(),
    daysOffLimit: useRef(),
    daysOffRemained: useRef(),
    department: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    positive: `Kérlek pozitív számot adj meg`,
    employeeIdFormat: `Az azonosító nem megfelelő formátumú (2 kis - vagy nagybetű és 4 szám)`,
    futureDate: `Nem hiszem el hogy a jövőben születtél`,
    idNotUnique: `Ez az azonosító már létezik`,
  });

  const [formErrors, setFormErrors] = useState({
    employeeId: '',
    familyName: '',
    givenName: '',
    birthdate: '',
    daysOffLimit: '',
    daysOffRemained: '',
    department: '',
  });

  const messageTypes = Object.freeze({
    success: `Az adatok sikeresen mentésre kerültek`,
    fail: `Az adatok mentése sikertelen`,
  });

  const validators = {
    employeeId: {
      required: isFieldEmpty,
      employeeIdFormat: isIdFormatValid,
      idNotUnique: idExists,
    },
    familyName: {
      required: isFieldEmpty,
    },
    givenName: {
      required: isFieldEmpty,
    },
    birthdate: {
      required: isFieldEmpty,
      futureDate: isDateInFuture,
    },
    daysOffLimit: {
      required: isFieldEmpty,
      positive: isValueNegative,
    },
    daysOffRemained: {
      required: isFieldEmpty,
      positive: isValueNegative,
    },
    department: {
      required: isFieldEmpty,
    },
  };

  const handleSubmit = e => {
    e.preventDefault();

    setAlert('');
    setFormErrors({
      employeeId: '',
      familyName: '',
      givenName: '',
      birthdate: '',
      daysOffLimit: '',
      daysOffRemained: '',
      department: '',
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
        setEmployees(prev =>
          prev.concat({
            employeeId: formData.employeeId,
            familyName: formData.familyName,
            givenName: formData.givenName,
            birthdate: formData.birthdate,
            daysOffLimit: formData.daysOffLimit,
            daysOff:
              parseInt(formData.daysOffLimit) -
              parseInt(formData.daysOffRemained),
            department: formData.department,
          })
        );
        setFormData({
          employeeId: '',
          familyName: '',
          givenName: '',
          birthdate: '',
          daysOffLimit: '',
          daysOffRemained: '',
          department: '',
        });
        setAlert({ alertType: 'success', message: messageTypes.success });
      }
      if (type === 'edit') {
        const filtered = employees.filter(value => value.employeeId !== id);

        setEmployees(filtered);
        setEmployees(prev => [
          ...prev,
          {
            employeeId: formData.employeeId,
            familyName: formData.familyName,
            givenName: formData.givenName,
            birthdate: formData.birthdate,
            daysOffLimit: formData.daysOffLimit,
            daysOff:
              parseInt(formData.daysOffLimit) -
              parseInt(formData.daysOffRemained),
            department: formData.department,
          },
        ]);
        setEmployee('');
        setAlert({ alertType: 'success', message: messageTypes.success });
      }
    } else {
      setFormWasValidated(true);
    }
  };
  return (
    <div className='container-sm mt-5'>
      <NavLink to='/employees'>
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
          name='employeeId'
          value={formData.employeeId}
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
          reference={references.employeeId}
          error={formErrors.employeeId}
          required
        />
        <InputFieldSet
          name='familyName'
          value={formData.familyName}
          labelText='Családi név *'
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
          reference={references.familyName}
          error={formErrors.familyName}
          required
        />
        <InputFieldSet
          name='givenName'
          value={formData.givenName}
          labelText='Utónév *'
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
          reference={references.givenName}
          error={formErrors.givenName}
          required
        />
        <InputFieldSet
          name='birthdate'
          value={formData.birthdate}
          labelText='Születési dátum *'
          type='date'
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
          reference={references.birthdate}
          error={formErrors.birthdate}
          required
        />
        <InputFieldSet
          name='daysOffLimit'
          value={formData.daysOffLimit}
          labelText='Összes szabadnap *'
          type='number'
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
          reference={references.daysOffLimit}
          error={formErrors.daysOffLimit}
          required
        />
        <InputFieldSet
          name='daysOffRemained'
          value={formData.daysOffRemained}
          labelText='Felhasználható szabadnap *'
          type='number'
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
          reference={references.daysOffRemained}
          error={formErrors.daysOffRemained}
          required
        />
        <InputFieldSet
          name='department'
          value={formData.department}
          labelText='Foglalkoztató *'
          type='select'
          options={departments.map(dep => dep.departmentName)}
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
          reference={references.department}
          error={formErrors.department}
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
          </button>
          <NavLink to='/employees'>
            <button type='button' className='btn btn-dark mt-5'>
              Mégsem
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
