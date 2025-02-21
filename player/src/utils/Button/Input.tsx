import { useRef } from 'react';
import { InputContainer } from './styles';
import { InputProps } from '../interfaces';

function Input({ label, maxlength, icon, fontSize,containerStyle,labelStyle, ...rest } : InputProps) {
  const inputRef = useRef(null);
  
  return (
    <InputContainer>
      {label && (
        <label style={labelStyle ? labelStyle : undefined}>
          {label}
          {icon}
        </label>
      )}
      <input
        ref={inputRef}
        maxLength={maxlength}
        style={containerStyle ? containerStyle : undefined}
        {...rest}
      />
    </InputContainer>
  );
}

export default Input;
