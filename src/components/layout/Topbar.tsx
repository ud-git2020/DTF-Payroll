import { useNavigate } from 'react-router-dom';
import { CalendarDays, LogOut, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { shortDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Topbar() {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-surface px-6">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink-900">
          {user?.company ?? 'Doralawitiyehena Tea Factory(Pvt)Limited'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-1.5 text-sm text-ink-500 sm:flex">
          <CalendarDays className="h-4 w-4" />
          <span className="tabular">{shortDate(new Date())}</span>
        </div>
        <div className="flex items-center gap-2 border-l border-line pl-4">
          <UserCircle2 className="h-6 w-6 text-tea-700" />
          <span className="text-sm font-medium text-ink-900">
            {user?.name ?? 'Guest'}
          </span>
          <Button variant="ghost" size="icon" onClick={onLogout} title="Sign out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
