/* Domain model derived from the legacy payroll screens. */

export interface Company {
  id: number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  epfReg: string;
  tel: string;
  fax: string;
  email: string;
}

export interface Department {
  id: string; // e.g. "F1"
  name: string; // e.g. "Factory 1"
}

export interface EmployeeCode {
  code: string; // e.g. "01"
  name: string; // job category
}

export interface Bank {
  id: number;
  code: string;
  name: string;
  groupBankId: number | null;
  groupBankName?: string;
  person: string;
  account: string;
}

export type Title = 'Mr.' | 'Mrs.' | 'Miss' | 'Dr.' | 'Rev.';
export type Sex = 'M' | 'F';
export type PayMethod = 'Bank' | 'Cash' | 'Cheque';

export interface EmployeeBankInfo {
  payMethod: PayMethod;
  bankId: number | null;
  accountNo: string;
  companyAcc: string;
  options: 'Company' | 'Personal';
}

export interface Employee {
  id: string; // "0002"
  lastName: string;
  firstName: string;
  initials: string;
  title: Title;
  typeId: number; // -> EmployeeType
  depId: string; // -> Department
  empCode: string; // -> EmployeeCode (job category)
  nic: string;
  sex: Sex;
  married: boolean;
  add1: string;
  add2: string;
  add3: string;
  remarks: string;
  effectiveDate: string | null;
  markDelete: boolean;
  bank: EmployeeBankInfo;
}

/** Generic name/value attribute used by several attribute screens. */
export interface Attribute {
  name: string;
  value: number;
}

export interface EmployeeType {
  id: number;
  name: string; // "Staff Office", "Factory", ...
  formulas: { fmId: number; output: string }[];
}

export interface InstallmentRow {
  month: string; // "25-May-20"
  amount: number;
}

export interface LoanLike {
  employeeTypeId: number;
  empId: string;
  loanDate: string | null;
  months: number | null;
  premium: number | null;
  schedule: InstallmentRow[];
}

export interface Formula {
  id: number;
  name: string;
  empId: string | null;
  input: string;
  expression: string;
}

export interface PayrollRun {
  runId: number;
  date: string;
  employeeTypeId: number;
  description: string;
  excludeMarkedForDelete: boolean;
  rows: PayrollRunRow[];
}

export interface PayrollRunRow {
  empId: string;
  wd: number; // working days
  overdue: number;
  deductions: number;
  loan: number;
  tea: number;
  advance: number;
  festivalAdvInst: number;
  ibRate: number;
  pbWeight: number;
  coins: number;
}
