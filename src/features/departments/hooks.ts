import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/mocks/api';
import type { Department } from '@/types';

const key = ['departments'];

export function useDepartments() {
  return useQuery({ queryKey: key, queryFn: api.listDepartments });
}

export function useSaveDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: Department) => api.saveDepartment(d),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
}

export function useDeleteDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteDepartment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
}
