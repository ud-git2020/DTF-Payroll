import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/mocks/api';
import type { Bank } from '@/types';

const key = ['banks'];

export function useBanks() {
  return useQuery({ queryKey: key, queryFn: api.listBanks });
}

export function useSaveBank() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (b: Bank) => api.saveBank(b),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
}

export function useDeleteBank() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteBank(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
}
