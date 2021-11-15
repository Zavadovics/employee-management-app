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

const Departments = ({
  department,
  setDepartment,
  departments,
  setDepartments,
}) => {
  let navigate = useNavigate();
  const deleteModalRef = useRef();
  const state = {
    button: 1,
  };

  const [formData, setFormData] = useState({
    departmentId: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    departmentId: useRef(),
  };

  const [formErrors, setFormErrors] = useState({
    departmentId: '',
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
    departmentId: {
      required: isFieldEmpty,
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      departmentId: '',
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
      const foundDepartment = departments.filter(
        department => department.departmentId === formData.departmentId
      )[0];
      setDepartment(foundDepartment);
      if (state.button === 1) {
        navigate(`/departments/edit/${formData.departmentId}`);
      }
    } else {
      console.log('no input');
      setFormWasValidated(false);
    }
  };

  const handleDeleteConfirm = () => {
    const remainedDepartments = departments.filter(
      department => department.departmentId !== formData.departmentId
    );
    setDepartments(remainedDepartments);
    setAlert({ alertType: 'success', message: messageTypes.deleteSuccess });
    setDepartment('');
  };

  return (
    <div className='container-sm mt-5'>
      <h1>Szervezeti egységek</h1>
      <NavLink to='/departments/new'>
        <button type='button' className='btn btn-dark mt-5'>
          Létrehozás
        </button>{' '}
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
          type='select'
          departmentOptions={departments}
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
          {formData.departmentId === '' ? (
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
              data-id={formData.departmentId}
            >
              Törlés
            </button>
          )}
        </div>
      </form>
      <DeleteModal
        handleDeleteConfirm={handleDeleteConfirm}
        deleteModalRef={deleteModalRef}
        type='deleteDepartment'
      />
    </div>
  );
};

export default Departments;
