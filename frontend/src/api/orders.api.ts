import { CreateOrder } from '@/common/types/order.types'
import { ordersService } from '@/services/resources/orders.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersService.getAll()
  })
}

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOrder) => ordersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
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
