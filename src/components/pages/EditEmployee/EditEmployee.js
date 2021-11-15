import EmployeeForm from '../../common/EmployeeForm/EmployeeForm';
import { useParams } from 'react-router';

const EditEmployee = ({
  departments,
  employee,
  setEmployee,
  employees,
  setEmployees,
}) => {
  let { id } = useParams();

  return (
    <div className='container-sm mt-5'>
      <h1>Dolgozó adatainak módosítása</h1>
      <EmployeeForm
        type='edit'
        id={id}
        departments={departments}
        employee={employee}
        setEmployee={setEmployee}
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
};

export default EditEmployee;
