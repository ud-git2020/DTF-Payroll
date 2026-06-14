import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { Department } from '@/types';
import {
  useDepartments,
  useDeleteDepartment,
  useSaveDepartment,
} from './hooks';
import { PageHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Modal } from '@/components/ui/modal';
import { Field, Input } from '@/components/ui/input';

export function DepartmentsPage() {
  const { data, isLoading } = useDepartments();
  const save = useSaveDepartment();
  const del = useDeleteDepartment();

  const [editing, setEditing] = useState<Department | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<Department>({ defaultValues: { id: '', name: '' } });

  const startCreate = () => {
    setEditing(null);
    form.reset({ id: '', name: '' });
    setOpen(true);
  };
  const startEdit = (d: Department) => {
    setEditing(d);
    form.reset(d);
    setOpen(true);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    await save.mutateAsync(values);
    setOpen(false);
  });

  const columns: ColumnDef<Department, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'Dep ID',
      cell: (c) => (
        <span className="tabular font-medium text-ink-900">
          {c.getValue() as string}
        </span>
      ),
    },
    { accessorKey: 'name', header: 'Department Name' },
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
              if (confirm(`Delete department ${row.original.id}?`))
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
        title="Departments"
        subtitle="Maintain factory and office departments"
        actions={
          <Button onClick={startCreate}>
            <Plus className="h-4 w-4" /> New Department
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        onRowClick={startEdit}
        searchPlaceholder="Search departments…"
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `Edit ${editing.id}` : 'New Department'}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={save.isPending}>
              {save.isPending ? 'Saving…' : 'Update'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Dep ID" error={form.formState.errors.id?.message}>
            <Input
              disabled={!!editing}
              placeholder="F1"
              {...form.register('id', { required: 'ID is required' })}
            />
          </Field>
          <Field label="Dep Name" error={form.formState.errors.name?.message}>
            <Input
              placeholder="Factory 1"
              {...form.register('name', { required: 'Name is required' })}
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
