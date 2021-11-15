const InputFieldSet = ({
  name,
  type,
  value,
  placeholder,
  error,
  formData,
  onChange,
  onBlur,
  labelText,
  required,
  reference,
  employeeOptions,
  departmentOptions,
  options,
}) => {
  let inputField;
  if (type === 'select' && options) {
    inputField = (
      <select
        id={name}
        name={name}
        required={required}
        className={'form-select'}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
        value={value}
      >
        <option value={''}>{value === '' ? 'Válassz' : value}</option>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (type === 'select' && employeeOptions) {
    inputField = (
      <select
        id={name}
        name={name}
        required={required}
        className={'form-select'}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
        value={value}
      >
        <option value={''}>Válassz!</option>
        {employeeOptions.map(option => (
          <option value={option.employeeId} key={option.employeeId}>
            {option.familyName} {option.givenName}
          </option>
        ))}
      </select>
    );
  } else if (type === 'select' && departmentOptions) {
    inputField = (
      <select
        id={name}
        name={name}
        required={required}
        className={'form-select'}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
        value={value}
      >
        <option value={''}>Válassz!</option>
        {departmentOptions.map(option => (
          <option value={option.departmentId} key={option.departmentName}>
            {option.departmentName}
          </option>
        ))}
      </select>
    );
  } else if (type === 'textarea') {
    inputField = (
      <textarea
        className='form-control'
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        ref={reference}
        rows='3'
        value={formData}
      />
    );
  } else {
    inputField = (
      <input
        type={type}
        placeholder={placeholder}
        className='form-control'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        ref={reference}
      />
    );
  }

  return (
    <div className={`mb-3 ${error !== '' ? 'was-validated' : ''}`}>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      {inputField}
      <div className='invalid-feedback'>{error}</div>
    </div>
  );
};

export default InputFieldSet;
