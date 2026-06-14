import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout, ProtectedRoute } from '@/components/layout/AppLayout';
import { LoginPage } from '@/features/auth/LoginPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { DepartmentsPage } from '@/features/departments/DepartmentsPage';
import { BanksPage } from '@/features/banks/BanksPage';
import { EmployeesPage } from '@/features/employees/EmployeesPage';
import { EmployeeAttributesPage } from '@/features/attributes/EmployeeAttributesPage';
import { CompanyAttributesPage } from '@/features/attributes/CompanyAttributesPage';
import { CompanyPage } from '@/features/masters/CompanyPage';
import { PayrollRunPage } from '@/features/payroll/PayrollRunPage';
import { PlaceholderPage } from '@/features/masters/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="payroll" element={<PayrollRunPage />} />

            <Route path="employees" element={<EmployeesPage />} />
            <Route
              path="employee-attributes"
              element={<EmployeeAttributesPage />}
            />
            <Route
              path="loans"
              element={<PlaceholderPage title="Loans" />}
            />
            <Route
              path="festival-advance"
              element={<PlaceholderPage title="Festival Advance" />}
            />

            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="banks" element={<BanksPage />} />
            <Route
              path="employee-codes"
              element={<PlaceholderPage title="Employee Codes" />}
            />
            <Route
              path="employee-types"
              element={<PlaceholderPage title="Employee Types" />}
            />
            <Route
              path="formulas"
              element={<PlaceholderPage title="Formula Pro" />}
            />

            <Route path="company" element={<CompanyPage />} />
            <Route
              path="company-attributes"
              element={<CompanyAttributesPage />}
            />
            <Route
              path="users"
              element={<PlaceholderPage title="Users" />}
            />
            <Route
              path="options"
              element={<PlaceholderPage title="Options / Backup" />}
            />
            <Route
              path="paysheet"
              element={<PlaceholderPage title="Pay Sheet" />}
            />
          </Route>
        </Route>

        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
