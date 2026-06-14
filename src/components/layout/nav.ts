import {
  LayoutDashboard,
  Users,
  Building2,
  Landmark,
  Wallet,
  Calculator,
  Settings,
  CreditCard,
  Layers,
  SlidersHorizontal,
  Receipt,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  ready?: boolean; // implemented in this scaffold
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard, ready: true },
      {
        label: 'Payroll Run',
        to: '/payroll',
        icon: Calculator,
        ready: true,
      },
    ],
  },
  {
    title: 'People',
    items: [
      { label: 'Employees', to: '/employees', icon: Users, ready: true },
      {
        label: 'Employee Attributes',
        to: '/employee-attributes',
        icon: SlidersHorizontal,
        ready: true,
      },
      { label: 'Loans', to: '/loans', icon: Receipt },
      {
        label: 'Festival Advance',
        to: '/festival-advance',
        icon: PartyPopper,
      },
    ],
  },
  {
    title: 'Masters',
    items: [
      {
        label: 'Departments',
        to: '/departments',
        icon: Building2,
        ready: true,
      },
      { label: 'Banks', to: '/banks', icon: Landmark, ready: true },
      { label: 'Employee Codes', to: '/employee-codes', icon: CreditCard },
      { label: 'Employee Types', to: '/employee-types', icon: Layers },
      { label: 'Formula Pro', to: '/formulas', icon: Calculator },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { label: 'Company', to: '/company', icon: Building2, ready: true },
      {
        label: 'Company Attributes',
        to: '/company-attributes',
        icon: SlidersHorizontal,
        ready: true,
      },
      { label: 'Users', to: '/users', icon: Users },
      { label: 'Options / Backup', to: '/options', icon: Settings },
      { label: 'Pay Sheet', to: '/paysheet', icon: Wallet },
    ],
  },
];
