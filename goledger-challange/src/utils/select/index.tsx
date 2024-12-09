import { useRef } from 'react';
import { SelectContainer } from './styles';
import { SelectProps } from '../interfaces';

function Select({ label, options, icon, fontSize, containerStyle, labelStyle,value, ...rest }: SelectProps) {
  const selectRef = useRef(null);

  return (
    <SelectContainer>
      {label && (
        <label style={labelStyle ? labelStyle : undefined}>
          {label}
          {icon}
        </label>
      )}
      <select
        ref={selectRef}
        style={containerStyle ? containerStyle : undefined}
        {...rest}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SelectContainer>
  );
}

export default Select;
