import type { Attribute } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Recreates the legacy Attribute / Value editor grids (Employee-Attributes,
 * System-Attributes, Employee-Type-Attributes). Warm tint deliberately
 * echoes the old pale-yellow editable grid so existing staff recognise it.
 */
export function AttributeGrid({
  rows,
  onChange,
  readOnly,
}: {
  rows: Attribute[];
  onChange?: (next: Attribute[]) => void;
  readOnly?: boolean;
}) {
  const update = (i: number, value: number) => {
    if (!onChange) return;
    const next = rows.map((r, idx) => (idx === i ? { ...r, value } : r));
    onChange(next);
  };

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-amber-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-amber-line bg-amber-edit">
            <th className="px-3 py-2 text-left text-xs font-semibold text-ink-500">
              Attribute
            </th>
            <th className="w-40 px-3 py-2 text-right text-xs font-semibold text-ink-500">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className="border-b border-amber-line/60 bg-amber-edit/40 last:border-0"
            >
              <td className="px-3 py-1.5 font-medium text-ink-700">{r.name}</td>
              <td className="px-1 py-1">
                <input
                  type="number"
                  value={r.value}
                  readOnly={readOnly}
                  onChange={(e) => update(i, Number(e.target.value))}
                  className={cn(
                    'tabular w-full rounded border border-transparent bg-transparent px-2 py-1 text-right text-ink-900 focus:border-tea-500 focus:bg-surface focus:outline-none',
                    readOnly && 'cursor-default'
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
