import { OrderCreate } from '@/common/types/order.types'
import { ordersService } from '@/services/resources/orders.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Ref } from 'vue'

export const useOrdersQuery = (options?: { enabled?: Ref<boolean> }) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersService.getAll(),
    retry: false,
    enabled: options?.enabled ?? true
  })
}

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: OrderCreate) => ordersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => ordersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })
}
