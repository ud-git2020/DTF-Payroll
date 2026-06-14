import * as db from './db';
import type { Bank, Department, Employee } from '@/types';

/**
 * A tiny fake API. Each call returns a Promise and adds latency so the
 * UI exercises real loading / error states via TanStack Query. Swap this
 * file for real `fetch`/axios calls when the backend is ready — the
 * feature hooks won't need to change.
 */
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));
const clone = <T>(v: T): T => structuredClone(v);
const newId = () =>
  String(Math.max(0, ...db.employees.map((e) => Number(e.id))) + 1).padStart(
    4,
    '0'
  );

export const api = {
  // --- Company / Org ----------------------------------------------------
  async getCompany() {
    await delay();
    return clone(db.company);
  },
  async getCompanyAttributes() {
    await delay();
    return clone(db.companyAttributes);
  },

  // --- Departments ------------------------------------------------------
  async listDepartments() {
    await delay();
    return clone(db.departments);
  },
  async saveDepartment(d: Department) {
    await delay();
    const idx = db.departments.findIndex((x) => x.id === d.id);
    if (idx >= 0) db.departments[idx] = d;
    else db.departments.push(d);
    return clone(d);
  },
  async deleteDepartment(id: string) {
    await delay();
    const idx = db.departments.findIndex((x) => x.id === id);
    if (idx >= 0) db.departments.splice(idx, 1);
    return { id };
  },

  // --- Banks ------------------------------------------------------------
  async listBanks() {
    await delay();
    return clone(db.banks);
  },
  async saveBank(b: Bank) {
    await delay();
    const idx = db.banks.findIndex((x) => x.id === b.id);
    if (idx >= 0) db.banks[idx] = b;
    else db.banks.push(b);
    return clone(b);
  },
  async deleteBank(id: number) {
    await delay();
    const idx = db.banks.findIndex((x) => x.id === id);
    if (idx >= 0) db.banks.splice(idx, 1);
    return { id };
  },

  // --- Employees --------------------------------------------------------
  async listEmployees() {
    await delay();
    return clone(db.employees);
  },
  async getEmployee(id: string) {
    await delay();
    const e = db.employees.find((x) => x.id === id);
    if (!e) throw new Error(`Employee ${id} not found`);
    return clone(e);
  },
  async saveEmployee(e: Employee) {
    await delay();
    const exists = db.employees.findIndex((x) => x.id === e.id);
    if (exists >= 0) {
      db.employees[exists] = e;
    } else {
      e.id = e.id || newId();
      db.employees.push(e);
    }
    return clone(e);
  },
  async deleteEmployee(id: string) {
    await delay();
    const idx = db.employees.findIndex((x) => x.id === id);
    if (idx >= 0) db.employees.splice(idx, 1);
    return { id };
  },

  // --- Reference data ---------------------------------------------------
  async listEmployeeTypes() {
    await delay();
    return clone(db.employeeTypes);
  },
  async listEmployeeCodes() {
    await delay();
    return clone(db.employeeCodes);
  },
  async getEmployeeAttributes(empId: string) {
    await delay();
    return clone(db.employeeAttributes[empId] ?? []);
  },

  // --- Payroll ----------------------------------------------------------
  async listPayrollRuns() {
    await delay();
    return clone(db.payrollRuns);
  },
};
