import { useForm } from 'react-hook-form';
import type { Employee } from '@/types';
import {
  useBanksRef,
  useDepartmentsRef,
  useEmployeeCodesRef,
  useEmployeeTypes,
  useSaveEmployee,
} from './hooks';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/input';
import { Select, Checkbox } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const blankEmployee: Employee = {
  id: '',
  lastName: '',
  firstName: '',
  initials: '',
  title: 'Mr.',
  typeId: 1,
  depId: 'F1',
  empCode: '01',
  nic: '',
  sex: 'M',
  married: false,
  add1: '',
  add2: '',
  add3: '',
  remarks: '',
  effectiveDate: null,
  markDelete: false,
  bank: {
    payMethod: 'Bank',
    bankId: null,
    accountNo: '',
    companyAcc: '',
    options: 'Company',
  },
};

export function EmployeeForm({
  open,
  initial,
  onClose,
}: {
  open: boolean;
  initial: Employee;
  onClose: () => void;
}) {
  const types = useEmployeeTypes();
  const deps = useDepartmentsRef();
  const banks = useBanksRef();
  const codes = useEmployeeCodesRef();
  const save = useSaveEmployee();

  const { register, handleSubmit, watch, setValue, formState } =
    useForm<Employee>({ values: initial });

  const isNew = !initial.id;
  const onSubmit = handleSubmit(async (v) => {
    await save.mutateAsync({ ...v, typeId: Number(v.typeId) });
    onClose();
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isNew ? 'New Employee' : `Employee ${initial.id}`}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={save.isPending}>
            {save.isPending ? 'Saving…' : 'Update'}
          </Button>
        </>
      }
    >
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="bank">Bank</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Emp ID" error={formState.errors.id?.message}>
              <Input
                disabled={!isNew}
                placeholder="auto"
                {...register('id')}
              />
            </Field>
            <Field label="NIC">
              <Input className="tabular" {...register('nic')} />
            </Field>
            <Field label="Last Name" error={formState.errors.lastName?.message}>
              <Input {...register('lastName', { required: 'Required' })} />
            </Field>
            <Field label="First Name">
              <Input {...register('firstName')} />
            </Field>
            <Field label="Initials">
              <Input {...register('initials')} />
            </Field>
            <Field label="Title">
              <Select {...register('title')}>
                {['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Rev.'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </Field>
            <Field label="Employee Type">
              <Select {...register('typeId')}>
                {types.data?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Department">
              <Select {...register('depId')}>
                {deps.data?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.id} — {d.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Job Category (Emp Code)" className="col-span-2">
              <Select {...register('empCode')}>
                {codes.data?.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Sex">
              <Select {...register('sex')}>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
            </Field>
            <div className="flex items-end pb-2">
              <Checkbox
                label="Married"
                checked={watch('married')}
                onChange={(e) => setValue('married', e.target.checked)}
              />
            </div>
            <Field label="Address 1" className="col-span-2">
              <Input {...register('add1')} />
            </Field>
            <Field label="Address 2">
              <Input {...register('add2')} />
            </Field>
            <Field label="Address 3">
              <Input {...register('add3')} />
            </Field>
            <Field label="Effective Date">
              <Input type="date" {...register('effectiveDate')} />
            </Field>
            <Field label="Remarks" className="col-span-2">
              <Textarea rows={2} {...register('remarks')} />
            </Field>
            <div className="col-span-2 flex items-center gap-6 border-t border-line pt-3">
              <Checkbox
                label="Mark for delete"
                checked={watch('markDelete')}
                onChange={(e) => setValue('markDelete', e.target.checked)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bank">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Pay Method">
              <Select {...register('bank.payMethod')}>
                {['Bank', 'Cash', 'Cheque'].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </Select>
            </Field>
            <Field label="Options">
              <Select {...register('bank.options')}>
                <option value="Company">Company</option>
                <option value="Personal">Personal</option>
              </Select>
            </Field>
            <Field label="Bank" className="col-span-2">
              <Select {...register('bank.bankId')}>
                <option value="">— none —</option>
                {banks.data?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Account No.">
              <Input className="tabular" {...register('bank.accountNo')} />
            </Field>
            <Field label="Company Acc.">
              <Input className="tabular" {...register('bank.companyAcc')} />
            </Field>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
}
