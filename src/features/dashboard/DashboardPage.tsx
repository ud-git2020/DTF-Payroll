import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Users, Building2, Landmark, Calculator } from 'lucide-react';
import { api } from '@/mocks/api';
import { Card, CardBody, PageHeader, Badge } from '@/components/ui/card';
import { money, shortDate } from '@/lib/utils';

function Stat({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  to: string;
}) {
  return (
    <Link to={to}>
      <Card className="transition-shadow hover:shadow-md">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-tea-50 text-tea-700">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold tabular text-ink-900">
              {value}
            </div>
            <div className="text-xs text-ink-500">{label}</div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export function DashboardPage() {
  const employees = useQuery({
    queryKey: ['employees'],
    queryFn: api.listEmployees,
  });
  const departments = useQuery({
    queryKey: ['departments'],
    queryFn: api.listDepartments,
  });
  const banks = useQuery({ queryKey: ['banks'], queryFn: api.listBanks });
  const runs = useQuery({
    queryKey: ['payroll-runs'],
    queryFn: api.listPayrollRuns,
  });

  const lastRun = runs.data?.[0];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of the current payroll period"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Users}
          label="Employees"
          value={employees.data?.length ?? '—'}
          to="/employees"
        />
        <Stat
          icon={Building2}
          label="Departments"
          value={departments.data?.length ?? '—'}
          to="/departments"
        />
        <Stat
          icon={Landmark}
          label="Banks"
          value={banks.data?.length ?? '—'}
          to="/banks"
        />
        <Stat
          icon={Calculator}
          label="Last Run ID"
          value={lastRun?.runId ?? '—'}
          to="/payroll"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink-900">
                Latest payroll run
              </h2>
              {lastRun && <Badge tone="green">{shortDate(lastRun.date)}</Badge>}
            </div>
            {lastRun ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink-500">Description</span>
                  <span className="font-medium text-ink-900">
                    {lastRun.description}
                  </span>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink-500">Rows processed</span>
                  <span className="tabular font-medium">
                    {lastRun.rows.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-500">Total deductions</span>
                  <span className="tabular font-medium">
                    {money(
                      lastRun.rows.reduce((s, r) => s + r.deductions, 0)
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-ink-500">No runs yet.</p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-3 text-sm font-semibold text-ink-900">
              Quick links
            </h2>
            <div className="space-y-2 text-sm">
              {[
                ['Process payroll', '/payroll'],
                ['Add an employee', '/employees'],
                ['Edit company attributes', '/company-attributes'],
                ['Manage banks', '/banks'],
              ].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="block rounded-md px-3 py-2 text-ink-700 hover:bg-tea-50 hover:text-tea-700"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
