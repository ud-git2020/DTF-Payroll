import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import type { Attribute } from '@/types';
import { api } from '@/mocks/api';
import { useEmployees } from '@/features/employees/hooks';
import { PageHeader, Card, CardBody } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AttributeGrid } from '@/components/ui/attribute-grid';

export function EmployeeAttributesPage() {
  const employees = useEmployees();
  const [empId, setEmpId] = useState('0002');
  const [rows, setRows] = useState<Attribute[]>([]);

  const attrs = useQuery({
    queryKey: ['employee-attributes', empId],
    queryFn: () => api.getEmployeeAttributes(empId),
    enabled: !!empId,
  });

  useEffect(() => {
    if (attrs.data) setRows(attrs.data);
  }, [attrs.data]);

  const selected = employees.data?.find((e) => e.id === empId);

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Employee Attributes"
        subtitle="Per-employee payroll parameters"
        actions={
          <Button onClick={() => alert('Saved (demo)')}>
            <Save className="h-4 w-4" /> Update
          </Button>
        }
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Employee ID</Label>
              <Select value={empId} onChange={(e) => setEmpId(e.target.value)}>
                {employees.data?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.id} — {e.lastName}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-end">
              <p className="text-sm font-medium text-tea-700">
                {selected
                  ? `${selected.title} ${selected.initials} ${selected.lastName}`
                  : ''}
              </p>
            </div>
          </div>

          {attrs.isLoading ? (
            <p className="text-sm text-ink-500">Loading attributes…</p>
          ) : rows.length ? (
            <AttributeGrid rows={rows} onChange={setRows} />
          ) : (
            <p className="text-sm text-ink-500">
              No attributes defined for this employee.
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
