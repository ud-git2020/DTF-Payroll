import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Save } from 'lucide-react';
import type { PayrollRunRow } from '@/types';
import { api } from '@/mocks/api';
import { useEmployeeTypes } from '@/features/employees/hooks';
import { PageHeader, Card, CardBody } from '@/components/ui/card';
import { Field, Input, Label } from '@/components/ui/input';
import { Select, Checkbox } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { money, isoDate } from '@/lib/utils';

const cols: { key: keyof PayrollRunRow; label: string; money?: boolean }[] = [
  { key: 'empId', label: 'Emp ID' },
  { key: 'wd', label: 'WD' },
  { key: 'overdue', label: 'Overdue' },
  { key: 'deductions', label: 'Deductions', money: true },
  { key: 'loan', label: 'Loan', money: true },
  { key: 'tea', label: 'Tea', money: true },
  { key: 'advance', label: 'Advance', money: true },
  { key: 'festivalAdvInst', label: 'FestivalAdvInst', money: true },
  { key: 'ibRate', label: 'IBRate', money: true },
  { key: 'pbWeight', label: 'PBWeight' },
  { key: 'coins', label: 'Coins' },
];

export function PayrollRunPage() {
  const types = useEmployeeTypes();
  const { data } = useQuery({
    queryKey: ['payroll-runs'],
    queryFn: api.listPayrollRuns,
  });
  const run = data?.[0];
  const [rows, setRows] = useState<PayrollRunRow[]>([]);

  // hydrate the editable grid once the run loads
  useEffect(() => {
    if (run?.rows) setRows(run.rows);
  }, [run]);

  const setCell = (i: number, key: keyof PayrollRunRow, value: string) => {
    setRows((prev) =>
      prev.map((r, idx) =>
        idx === i
          ? { ...r, [key]: key === 'empId' ? value : Number(value) }
          : r
      )
    );
  };

  return (
    <div>
      <PageHeader
        title="Payroll Run"
        subtitle="Process a payroll period for an employee type"
        actions={
          <>
            <Button variant="outline">
              <Save className="h-4 w-4" /> Save
            </Button>
            <Button onClick={() => alert('Processing… (demo)')}>
              <Play className="h-4 w-4" /> Process (F11)
            </Button>
          </>
        }
      />

      <Card className="mb-4">
        <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field label="Run ID">
            <Input className="tabular" defaultValue={run?.runId ?? 256} readOnly />
          </Field>
          <Field label="Date">
            <Input
              type="date"
              defaultValue={run ? run.date : isoDate(new Date())}
            />
          </Field>
          <div className="space-y-1">
            <Label>Employee Type</Label>
            <Select defaultValue={run?.employeeTypeId}>
              {types.data?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-end pb-2">
            <Checkbox label="Don't include Marked for Delete" />
          </div>
          <Field label="Description" className="md:col-span-4">
            <Input defaultValue={run?.description} />
          </Field>
        </CardBody>
      </Card>

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-amber-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-line bg-amber-edit">
              {cols.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold text-ink-500"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.empId}
                className="border-b border-amber-line/60 bg-amber-edit/40 last:border-0"
              >
                {cols.map((c) => (
                  <td key={c.key} className="px-1 py-1">
                    <input
                      value={String(row[c.key])}
                      readOnly={c.key === 'empId'}
                      onChange={(e) => setCell(i, c.key, e.target.value)}
                      className="tabular w-full min-w-20 rounded border border-transparent bg-transparent px-2 py-1 text-ink-900 focus:border-tea-500 focus:bg-surface focus:outline-none read-only:font-medium"
                    />
                  </td>
                ))}
              </tr>
            ))}
            {/* totals */}
            <tr className="border-t-2 border-amber-line bg-amber-edit font-semibold">
              {cols.map((c) => (
                <td key={c.key} className="px-3 py-2 text-ink-700">
                  {c.key === 'empId' ? (
                    'Totals'
                  ) : c.money ? (
                    <span className="tabular">
                      {money(rows.reduce((s, r) => s + Number(r[c.key]), 0))}
                    </span>
                  ) : (
                    ''
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-ink-500">
        Press <kbd className="rounded border border-line px-1">F12</kbd> to
        process all employee types automatically and{' '}
        <kbd className="rounded border border-line px-1">F11</kbd> to process the
        selected type. (Demo: buttons above.)
      </p>
    </div>
  );
}
