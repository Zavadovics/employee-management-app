export const isFieldEmpty = value => {
  return value !== '';
};

const regex = /[A-Za-z]{2}[0-9]{4}/;

export const isIdFormatValid = value => {
  return regex.test(value);
};

export const isIdLengthValid = value => {
  return value.length === 6;
};

export const idExists = value => {
  const employees = JSON.parse(localStorage.getItem('storedEmployees'));
  const filteredEmployees =
    employees.filter(item => item.employeeId === value).length === 0;
  const departments = JSON.parse(localStorage.getItem('storedDepartments'));
  const filteredDepartments =
    departments.filter(item => item.departmentId === value).length === 0;
  return filteredEmployees && filteredDepartments;
};

export const isValueNegative = value => {
  return value > 0;
};

export const isDateInFuture = value => {
  const futureDate = new Date(value);
  const actualDate = new Date();
  return futureDate <= actualDate;
};
