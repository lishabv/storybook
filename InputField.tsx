import React, { useState, useEffect } from "react";
import type { InputFieldProps } from "./InputField.types";



import {
  Wrapper, Label, InputWrapper, Input, HelperText, ClearButton
} from "./InputField.styled";

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  //size = "md",
  type = "text",
  clearable,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);

  
  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
   
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  return (
    <Wrapper disabled={disabled} className={className}>
      {label && <Label>{label}</Label>}

      <InputWrapper>
        <Input
          type={type === "password" && showPassword ? "text" : type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          invalid={invalid}
        
          variant={variant}
        />

        {clearable && internalValue && (
          <ClearButton type="button" onClick={handleClear} aria-label="Clear input">
            ✕
          </ClearButton>
        )}

        {type === "password" && (
          <ClearButton
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </ClearButton>
        )}

        {loading && <span role="status">⏳</span>}
      </InputWrapper>

      {(helperText || errorMessage) && (
        <HelperText error={!!errorMessage}>
          {errorMessage ?? helperText}
        </HelperText>
      )}
    </Wrapper>
  );
};
