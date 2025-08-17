
export interface DataTableProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
  className?: string;
}
