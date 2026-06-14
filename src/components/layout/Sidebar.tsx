import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { navGroups } from './nav';
import { cn } from '@/lib/utils';

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line bg-surface">
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-tea-700 text-white">
          <Leaf className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink-900">DTF Payroll</div>
          <div className="text-[11px] text-ink-500">Tea Factory · v0.1</div>
        </div>
      </div>

      <nav className="scroll-thin flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <div className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-300">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-tea-50 font-medium text-tea-700'
                        : 'text-ink-700 hover:bg-paper'
                    )
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {!item.ready && (
                    <span className="rounded bg-paper px-1.5 py-0.5 text-[10px] text-ink-300">
                      soon
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
