import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { Employee } from '@/types';
import {
  useDeleteEmployee,
  useEmployees,
  useEmployeeTypes,
} from './hooks';
import { EmployeeForm, blankEmployee } from './EmployeeForm';
import { PageHeader, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

export function EmployeesPage() {
  const { data, isLoading } = useEmployees();
  const types = useEmployeeTypes();
  const del = useDeleteEmployee();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Employee>(blankEmployee);

  const typeName = (id: number) =>
    types.data?.find((t) => t.id === id)?.name ?? id;

  const startCreate = () => {
    setCurrent(blankEmployee);
    setOpen(true);
  };
  const startEdit = (e: Employee) => {
    setCurrent(e);
    setOpen(true);
  };

  const columns: ColumnDef<Employee, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'Emp ID',
      cell: (c) => <span className="tabular font-medium">{c.getValue() as string}</span>,
    },
    {
      id: 'name',
      header: 'Name',
      accessorFn: (e) =>
        `${e.title} ${e.initials} ${e.lastName} ${e.firstName}`.trim(),
    },
    { accessorKey: 'depId', header: 'Dept' },
    {
      accessorKey: 'typeId',
      header: 'Type',
      cell: (c) => typeName(c.getValue() as number),
    },
    {
      accessorKey: 'nic',
      header: 'NIC',
      cell: (c) => <span className="tabular">{c.getValue() as string}</span>,
    },
    {
      accessorKey: 'markDelete',
      header: 'Status',
      cell: (c) =>
        c.getValue() ? (
          <Badge tone="red">Marked</Badge>
        ) : (
          <Badge tone="green">Active</Badge>
        ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              startEdit(row.original);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete employee ${row.original.id}?`))
                del.mutate(row.original.id);
            }}
          >
            <Trash2 className="h-4 w-4 text-danger" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle="Personal records, type, department and bank details"
        actions={
          <Button onClick={startCreate}>
            <Plus className="h-4 w-4" /> New Employee
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        onRowClick={startEdit}
        searchPlaceholder="Search by name, NIC, ID…"
      />

      <EmployeeForm
        open={open}
        initial={current}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
