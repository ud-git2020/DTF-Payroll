import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/mocks/api';
import type { Employee } from '@/types';

const key = ['employees'];

export function useEmployees() {
  return useQuery({ queryKey: key, queryFn: api.listEmployees });
}

export function useSaveEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (e: Employee) => api.saveEmployee(e),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
}

export function useDeleteEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteEmployee(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
}

export function useEmployeeTypes() {
  return useQuery({
    queryKey: ['employee-types'],
    queryFn: api.listEmployeeTypes,
  });
}

export function useDepartmentsRef() {
  return useQuery({ queryKey: ['departments'], queryFn: api.listDepartments });
}

export function useBanksRef() {
  return useQuery({ queryKey: ['banks'], queryFn: api.listBanks });
}

export function useEmployeeCodesRef() {
  return useQuery({
    queryKey: ['employee-codes'],
    queryFn: api.listEmployeeCodes,
  });
}
