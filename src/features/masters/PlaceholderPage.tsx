import { Construction } from 'lucide-react';
import { PageHeader, Card, CardBody } from '@/components/ui/card';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <PageHeader title={title} subtitle="Module scaffolded — UI coming next" />
      <Card>
        <CardBody className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tea-50 text-tea-700">
            <Construction className="h-6 w-6" />
          </div>
          <p className="max-w-sm text-sm text-ink-500">
            This screen follows the same pattern as Departments, Banks and
            Employees. Add a <code>hooks.ts</code> + page under{' '}
            <code>src/features/</code> and wire a route in{' '}
            <code>App.tsx</code>.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
