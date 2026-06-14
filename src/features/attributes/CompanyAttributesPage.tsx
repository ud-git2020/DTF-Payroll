import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import type { Attribute } from '@/types';
import { api } from '@/mocks/api';
import { PageHeader, Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AttributeGrid } from '@/components/ui/attribute-grid';

export function CompanyAttributesPage() {
  const [rows, setRows] = useState<Attribute[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ['company-attributes'],
    queryFn: api.getCompanyAttributes,
  });

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="System / Company Attributes"
        subtitle="Doralawitiyehena Tea Factory(Pvt)Limited"
        actions={
          <Button onClick={() => alert('Saved (demo)')}>
            <Save className="h-4 w-4" /> Update
          </Button>
        }
      />
      <Card>
        <CardBody>
          {isLoading ? (
            <p className="text-sm text-ink-500">Loading…</p>
          ) : (
            <AttributeGrid rows={rows} onChange={setRows} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
