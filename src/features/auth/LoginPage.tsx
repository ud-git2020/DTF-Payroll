import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { shortDate } from '@/lib/utils';

interface LoginForm {
  userId: string;
  password: string;
  company: string;
}

const companies = [
  'Doralawitiyehena Tea Factory(Pvt)Limited',
  'DTF Estates (Pvt) Ltd',
];

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: { userId: '', password: '', company: companies[0] },
  });

  const onSubmit = (data: LoginForm) => {
    const ok = login(data.userId, data.password, data.company);
    if (ok) navigate('/');
    else setError('password', { message: 'Invalid credentials' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-tea-700 via-tea-600 to-tea-900 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
        <div className="flex flex-col items-center gap-2 border-b border-line bg-paper/60 px-8 py-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tea-700 text-white">
            <Leaf className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-semibold text-ink-900">DTF Payroll</h1>
          <p className="text-xs text-ink-500">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-8 py-7">
          <Field label="User ID" error={errors.userId?.message}>
            <Input
              autoFocus
              placeholder="dilshan"
              {...register('userId', { required: 'User ID is required' })}
            />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <Input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
            />
          </Field>
          <Field label="Company">
            <Select {...register('company')}>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>Date</span>
            <span className="tabular font-medium text-ink-700">
              {shortDate(new Date())}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Login'}
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Clear
            </Button>
          </div>
          <p className="pt-1 text-center text-[11px] text-ink-300">
            Demo mode — any non-empty credentials work.
          </p>
        </form>
      </div>
    </div>
  );
}
