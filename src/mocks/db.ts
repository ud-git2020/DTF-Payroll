import type {
  Attribute,
  Bank,
  Company,
  Department,
  Employee,
  EmployeeCode,
  EmployeeType,
  Formula,
  LoanLike,
  PayrollRun,
} from '@/types';

/* ----------------------------------------------------------------
   Dummy data seeded directly from the legacy payroll screenshots so
   the UI feels real. Mutated in place by the mock API (mocks/api.ts).
------------------------------------------------------------------- */

export const company: Company = {
  id: 1,
  name: 'Doralawitiyehena Tea Factory(Pvt)Limited',
  address1: 'No: 296/2',
  address2: 'Makumbura',
  address3: 'Pannipitiya',
  epfReg: 'T 07267',
  tel: '011 4301916',
  fax: '011 4301916',
  email: 'dtfgroup@gmail.com',
};

export const departments: Department[] = [
  { id: 'F1', name: 'Factory 1' },
  { id: 'F2', name: 'Factory 2' },
  { id: 'OFF', name: 'Head Office' },
  { id: 'FLD', name: 'Field' },
  { id: 'TRN', name: 'Transport' },
];

export const employeeCodes: EmployeeCode[] = [
  { code: '01', name: 'Managers, Senior Officials and Legislators' },
  { code: '02', name: 'Professionals' },
  { code: '03', name: 'Technicians and Associate Professionals' },
  { code: '04', name: 'Clerks' },
  { code: '05', name: 'Service and Sales Workers' },
  { code: '06', name: 'Skilled Agricultural and Fishery Workers' },
  { code: '07', name: 'Craft and Related Trades Workers' },
  { code: '08', name: 'Plant and Machine Operators and Assemblers' },
  { code: '09', name: 'Elementary Occupations' },
];

export const banks: Bank[] = [
  {
    id: 81,
    code: '7135',
    name: 'Sanasa Samithiya - South Panawenna',
    groupBankId: 15,
    groupBankName: "People's Bank - Kahawatta",
    person: 'Sanasa Samithiya - South Panawe',
    account: '155-2-001-0-0044282',
  },
  {
    id: 12,
    code: '7010',
    name: 'Bank of Ceylon - Embilipitiya',
    groupBankId: null,
    person: '',
    account: '0071-2-441-2-001',
  },
  {
    id: 15,
    code: '7135',
    name: "People's Bank - Kahawatta",
    groupBankId: null,
    person: '',
    account: '004-1-002-9-115',
  },
  {
    id: 21,
    code: '7278',
    name: 'Commercial Bank - Ratnapura',
    groupBankId: null,
    person: '',
    account: '8002-0114-552',
  },
];

export const employeeTypes: EmployeeType[] = [
  {
    id: 1,
    name: 'Staff Office',
    formulas: [
      { fmId: 70, output: 'LWD' },
      { fmId: 4, output: 'WD' },
      { fmId: 38, output: 'IBAmount' },
      { fmId: 17, output: 'PBAmount' },
      { fmId: 75, output: 'SExtra' },
      { fmId: 25, output: 'Extra' },
      { fmId: 19, output: 'Basic' },
      { fmId: 23, output: 'IP' },
      { fmId: 26, output: 'OtherDed' },
      { fmId: 15, output: 'EPFCmp' },
      { fmId: 14, output: 'EPFEmp' },
      { fmId: 16, output: 'ETF' },
      { fmId: 76, output: 'Stamp' },
      { fmId: 18, output: 'Sum' },
      { fmId: 42, output: 'IsCasual' },
      { fmId: 48, output: 'Gross' },
      { fmId: 49, output: 'Expense' },
      { fmId: 50, output: 'CoinCF' },
      { fmId: 51, output: 'DebitCF' },
      { fmId: 52, output: 'PayMethod' },
    ],
  },
  { id: 2, name: 'Factory', formulas: [] },
  { id: 3, name: 'Field', formulas: [] },
  { id: 4, name: 'Casual', formulas: [] },
];

export const employees: Employee[] = [
  {
    id: '0002',
    lastName: 'Wijesinghe',
    firstName: '',
    initials: 'T M S',
    title: 'Mr.',
    typeId: 1,
    depId: 'F1',
    empCode: '01',
    nic: '682171146V',
    sex: 'M',
    married: true,
    add1: 'Pahala Bopitiya',
    add2: 'Bopitiya',
    add3: 'Pelmadulla',
    remarks: 'Permanent Date-1992-10-01',
    effectiveDate: null,
    markDelete: false,
    bank: {
      payMethod: 'Bank',
      bankId: 12,
      accountNo: '0071-2-441-2-100',
      companyAcc: '',
      options: 'Company',
    },
  },
  {
    id: '0003',
    lastName: 'Perera',
    firstName: 'Nimal',
    initials: 'K A N',
    title: 'Mr.',
    typeId: 1,
    depId: 'OFF',
    empCode: '04',
    nic: '751234567V',
    sex: 'M',
    married: true,
    add1: '12 Temple Road',
    add2: 'Kahawatta',
    add3: '',
    remarks: 'Permanent Date-2001-03-15',
    effectiveDate: null,
    markDelete: false,
    bank: {
      payMethod: 'Bank',
      bankId: 15,
      accountNo: '004-1-002-9-220',
      companyAcc: '',
      options: 'Company',
    },
  },
  {
    id: '0004',
    lastName: 'Fernando',
    firstName: 'Kamala',
    initials: 'W D',
    title: 'Mrs.',
    typeId: 2,
    depId: 'F1',
    empCode: '08',
    nic: '825671234V',
    sex: 'F',
    married: true,
    add1: 'No 5 Station Road',
    add2: 'Pelmadulla',
    add3: '',
    remarks: '',
    effectiveDate: null,
    markDelete: false,
    bank: {
      payMethod: 'Cash',
      bankId: null,
      accountNo: '',
      companyAcc: '',
      options: 'Company',
    },
  },
  {
    id: '0007',
    lastName: 'Bandara',
    firstName: 'Sunil',
    initials: 'R M',
    title: 'Mr.',
    typeId: 3,
    depId: 'FLD',
    empCode: '06',
    nic: '700123456V',
    sex: 'M',
    married: false,
    add1: 'Field Quarters',
    add2: 'Doralawitiyehena',
    add3: '',
    remarks: '',
    effectiveDate: null,
    markDelete: true,
    bank: {
      payMethod: 'Cash',
      bankId: null,
      accountNo: '',
      companyAcc: '',
      options: 'Company',
    },
  },
];

/** keyed by employeeId */
export const employeeAttributes: Record<string, Attribute[]> = {
  '0002': [
    { name: 'EPFLimit', value: 27000 },
    { name: 'Basic', value: 35000 },
    { name: 'HousingRent', value: 5000 },
    { name: 'PBRate', value: 0.23 },
    { name: 'IPAmount', value: 0 },
    { name: 'IBRate', value: 400 },
  ],
  '0003': [
    { name: 'EPFLimit', value: 27000 },
    { name: 'Basic', value: 42000 },
    { name: 'HousingRent', value: 6000 },
    { name: 'PBRate', value: 0.25 },
    { name: 'IPAmount', value: 0 },
    { name: 'IBRate', value: 450 },
  ],
};

/** keyed by employeeTypeId */
export const employeeTypeAttributes: Record<number, Attribute[]> = {
  1: [
    { name: 'IPAmount', value: 0 },
    { name: 'Casual', value: 0 },
    { name: 'IBAmount', value: 0 },
    { name: 'Basic', value: 0 },
    { name: 'MealRate', value: 0 },
    { name: 'EPFLimit', value: 7450 },
    { name: 'PBRate', value: 0 },
    { name: 'PetAllowance', value: 0 },
    { name: 'HousingRent', value: 0 },
  ],
};

export const companyAttributes: Attribute[] = [
  { name: 'LGA', value: 1278.28 },
  { name: 'FBLR', value: 163.23 },
  { name: 'LWD', value: 22 },
  { name: 'OutTurn', value: 21.5 },
  { name: 'BLR', value: 163.23 },
  { name: 'PBWeight1', value: 0 },
  { name: 'BankThreshold', value: 1000 },
  { name: 'FA', value: 1308.51 },
];

export const formulas: Formula[] = [
  {
    id: 70,
    name: 'LWD',
    empId: null,
    input: 'aLWD=25',
    expression: 'out=aLWD',
  },
  {
    id: 4,
    name: 'WD',
    empId: null,
    input: 'aWD=22',
    expression: 'out=aWD',
  },
  {
    id: 19,
    name: 'Basic',
    empId: null,
    input: 'basic=35000',
    expression: 'out=basic',
  },
];

export const loans: LoanLike[] = [
  {
    employeeTypeId: 1,
    empId: '0002',
    loanDate: '2006-01-25',
    months: 24,
    premium: 250,
    schedule: Array.from({ length: 19 }, (_, i) => {
      const start = new Date(2006, 0, 25);
      const d = new Date(start.getFullYear(), start.getMonth() + i, 25);
      const mm = d.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      });
      return { month: mm.replace(/ /g, '-'), amount: 250 };
    }),
  },
];

export const festivalAdvances: LoanLike[] = [
  {
    employeeTypeId: 1,
    empId: '0002',
    loanDate: '2020-05-25',
    months: 9,
    premium: 1000,
    schedule: [
      { month: '25-May-20', amount: 2000 },
      { month: '25-Jul-20', amount: 1000 },
      { month: '25-Aug-20', amount: 1000 },
      { month: '25-Sep-20', amount: 1000 },
      { month: '25-Oct-20', amount: 1000 },
      { month: '25-Nov-20', amount: 1000 },
      { month: '25-Dec-20', amount: 1000 },
      { month: '25-Jan-21', amount: 1000 },
      { month: '25-Feb-21', amount: 1000 },
    ],
  },
];

export const payrollRuns: PayrollRun[] = [
  {
    runId: 256,
    date: '2026-04-30',
    employeeTypeId: 1,
    description: 'April 2026 - Staff Office',
    excludeMarkedForDelete: false,
    rows: [
      {
        empId: '0002',
        wd: 22,
        overdue: 0,
        deductions: 1500,
        loan: 250,
        tea: 350,
        advance: 0,
        festivalAdvInst: 1000,
        ibRate: 400,
        pbWeight: 0,
        coins: 0,
      },
      {
        empId: '0003',
        wd: 21,
        overdue: 1,
        deductions: 0,
        loan: 0,
        tea: 350,
        advance: 5000,
        festivalAdvInst: 0,
        ibRate: 450,
        pbWeight: 0,
        coins: 0,
      },
    ],
  },
];
