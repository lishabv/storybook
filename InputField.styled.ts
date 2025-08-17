import styled, { css } from "styled-components";

const sizes = {
  sm: css`padding: 4px 8px; font-size: 0.875rem;`,
  md: css`padding: 6px 12px; font-size: 1rem;`,
  lg: css`padding: 10px 16px; font-size: 1.125rem;`,
};

const variants = {
  filled: css`
    background: #f2f2f2;
    border: 1px solid transparent;
    &:focus { border-color: #0070f3; background: #fff; }
  `,
  outlined: css`
    border: 1px solid #ccc;
    background: #fff;
    &:focus { border-color: #0070f3; }
  `,
  ghost: css`
    border: none;
    border-bottom: 1px solid #ccc;
    background: transparent;
    &:focus { border-color: #0070f3; }
  `,
};

export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #333;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Input = styled.input<{
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'ghost';
  invalid?: boolean;
}>`
  border-radius: 6px;
  width: 100%;
  outline: none;
  ${({ size }) => sizes[size || "md"]};
  ${({ variant }) => variants[variant || "outlined"]};

  ${({ invalid }) =>
    invalid &&
    css`
      border-color: red !important;
    `}
`;

export const HelperText = styled.span<{ error?: boolean }>`
  font-size: 0.75rem;
  color: ${({ error }) => (error ? "red" : "#666")};
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;