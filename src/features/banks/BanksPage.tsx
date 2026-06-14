import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { Bank } from '@/types';
import { useBanks, useDeleteBank, useSaveBank } from './hooks';
import { PageHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Modal } from '@/components/ui/modal';
import { Field, Input } from '@/components/ui/input';

type BankForm = Omit<Bank, 'id' | 'groupBankId'> & {
  id: string;
  groupBankId: string;
};

const empty: BankForm = {
  id: '',
  code: '',
  name: '',
  groupBankId: '',
  person: '',
  account: '',
};

export function BanksPage() {
  const { data, isLoading } = useBanks();
  const save = useSaveBank();
  const del = useDeleteBank();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Bank | null>(null);

  const form = useForm<BankForm>({ defaultValues: empty });

  const startCreate = () => {
    setEditing(null);
    form.reset(empty);
    setOpen(true);
  };
  const startEdit = (b: Bank) => {
    setEditing(b);
    form.reset({
      ...b,
      id: String(b.id),
      groupBankId: b.groupBankId ? String(b.groupBankId) : '',
    });
    setOpen(true);
  };

  const onSubmit = form.handleSubmit(async (v) => {
    await save.mutateAsync({
      ...v,
      id: Number(v.id),
      groupBankId: v.groupBankId ? Number(v.groupBankId) : null,
    });
    setOpen(false);
  });

  const columns: ColumnDef<Bank, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'Bank ID',
      cell: (c) => <span className="tabular">{c.getValue() as number}</span>,
    },
    {
      accessorKey: 'code',
      header: 'Code',
      cell: (c) => <span className="tabular">{c.getValue() as string}</span>,
    },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'account',
      header: 'Account',
      cell: (c) => <span className="tabular">{c.getValue() as string}</span>,
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
              if (confirm(`Delete bank ${row.original.id}?`))
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
        title="Banks"
        subtitle="Bank and group-bank master records"
        actions={
          <Button onClick={startCreate}>
            <Plus className="h-4 w-4" /> New Bank
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        onRowClick={startEdit}
        searchPlaceholder="Search banks…"
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `Edit Bank ${editing.id}` : 'New Bank'}
        size="lg"
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
        <div className="grid grid-cols-2 gap-4">
          <Field label="Bank ID" error={form.formState.errors.id?.message}>
            <Input
              type="number"
              disabled={!!editing}
              {...form.register('id', { required: 'Required' })}
            />
          </Field>
          <Field label="Code">
            <Input {...form.register('code')} />
          </Field>
          <Field
            label="Name"
            className="col-span-2"
            error={form.formState.errors.name?.message}
          >
            <Input {...form.register('name', { required: 'Required' })} />
          </Field>
          <Field label="Group Bank ID">
            <Input type="number" {...form.register('groupBankId')} />
          </Field>
          <Field label="Person">
            <Input {...form.register('person')} />
          </Field>
          <Field label="Bank Acc." className="col-span-2">
            <Input className="tabular" {...form.register('account')} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
