import styled, { css } from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th<{ sortable?: boolean }>`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
  user-select: none;

  ${({ sortable }) =>
    sortable &&
    css`
      &:hover {
        background: #f7f7f7;
      }
    `}
`;

export const Tr = styled.tr`
  &:hover {
    background: #fafafa;
  }
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 24px;
  color: #666;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 24px;
  font-weight: 500;
`;