import DepartmentForm from '../../common/DepartmentForm/DepartmentForm';

const NewDepartment = ({ departments, employees, setDepartments }) => {
  return (
    <div className='container-sm mt-5'>
      <h1>Új szervezeti egység hozzáadása</h1>
      <DepartmentForm
        type='new'
        employees={employees}
        departments={departments}
        setDepartments={setDepartments}
      />
    </div>
  );
};

export default NewDepartment;
