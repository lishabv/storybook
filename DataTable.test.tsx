import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { DataTable } from "./DataTable";
import type { DataTableProps } from "./DataTable.types";
import { beforeEach, describe, expect, it, vi } from "vitest";

type TestRow = { id: number; name: string };

const data: TestRow[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const columns: DataTableProps<TestRow>["columns"] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
];

describe("DataTable", () => {
  let onRowSelect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onRowSelect = vi.fn();
  });

  it("renders rows", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("handles row selection", async () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        onRowSelect={onRowSelect}
      />
    );

    const user = userEvent.setup();

    const aliceRow = screen.getByText("Alice").closest("tr")!;
    const checkbox = within(aliceRow).getByRole("checkbox");

    await user.click(checkbox);

    expect(onRowSelect).toHaveBeenCalledWith([{ id: 1, name: "Alice" }]);
  });

  it("shows loading state", () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it("allows sorting when column is sortable", async () => {
    render(<DataTable data={data} columns={columns} />);
    const user = userEvent.setup();

    const header = screen.getByRole("columnheader", { name: /name/i });
    await user.click(header); 
    const rows = screen.getAllByRole("row").map((row: { textContent: any; }) => row.textContent);
    expect(rows.join(" ")).toMatch(/Alice.*Bob/);
  });
});
