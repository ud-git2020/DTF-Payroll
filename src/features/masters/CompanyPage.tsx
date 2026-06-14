import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import type { Company } from '@/types';
import { api } from '@/mocks/api';
import { PageHeader, Card, CardBody } from '@/components/ui/card';
import { Field, Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CompanyPage() {
  const { data } = useQuery({ queryKey: ['company'], queryFn: api.getCompany });
  const { register, reset, handleSubmit } = useForm<Company>();

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const onSubmit = handleSubmit(() => alert('Company saved (demo)'));

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Company"
        subtitle="Registered company details used on pay sheets"
        actions={
          <Button onClick={onSubmit}>
            <Save className="h-4 w-4" /> Update
          </Button>
        }
      />
      <Card>
        <CardBody className="grid grid-cols-2 gap-4">
          <Field label="ID">
            <Input className="tabular" disabled {...register('id')} />
          </Field>
          <Field label="EPF Reg.">
            <Input className="tabular" {...register('epfReg')} />
          </Field>
          <Field label="Company" className="col-span-2">
            <Input {...register('name')} />
          </Field>
          <Field label="Address 1" className="col-span-2">
            <Input {...register('address1')} />
          </Field>
          <Field label="Address 2">
            <Input {...register('address2')} />
          </Field>
          <Field label="Address 3">
            <Input {...register('address3')} />
          </Field>
          <Field label="Tel">
            <Input className="tabular" {...register('tel')} />
          </Field>
          <Field label="Fax">
            <Input className="tabular" {...register('fax')} />
          </Field>
          <Field label="Email" className="col-span-2">
            <Input type="email" {...register('email')} />
          </Field>
        </CardBody>
      </Card>
    </div>
  );
}
