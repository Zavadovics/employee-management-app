import EmployeeForm from '../../common/EmployeeForm/EmployeeForm';

const NewEmployee = ({ departments, employees, setEmployees }) => {
  return (
    <div className='container-sm mt-5'>
      <h1>Új dolgozó hozzáadása</h1>
      <EmployeeForm
        type='new'
        departments={departments}
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
};

export default NewEmployee;
