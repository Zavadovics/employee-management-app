import DepartmentForm from '../../common/DepartmentForm/DepartmentForm';
import { useParams } from 'react-router';

const EditDepartment = ({
  departments,
  setDepartments,
  department,
  setDepartment,
}) => {
  let { id } = useParams();

  return (
    <div className='container-sm mt-5'>
      <h1>Szervezeti egység adatainak módosítása</h1>
      <DepartmentForm
        type='edit'
        id={id}
        department={department}
        setDepartment={setDepartment}
        departments={departments}
        setDepartments={setDepartments}
      />
    </div>
  );
};

export default EditDepartment;
