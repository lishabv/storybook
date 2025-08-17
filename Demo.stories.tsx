import { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField/InputField";
import { DataTable } from "../components/DataTable/DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta = { title: "Demo/Showcase" };
export default meta;

export const Playground: StoryObj = {
  render: () => (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <InputField label="Name" placeholder="Enter your name" helperText="This is a helper text" clearable />
      <DataTable<Person>
        data={people}
        columns={columns}
        selectable
        onRowSelect={(rows) => alert(JSON.stringify(rows))}
      />
    </div>
  ),
};