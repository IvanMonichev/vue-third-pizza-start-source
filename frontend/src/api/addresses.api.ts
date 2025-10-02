import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { addressesService } from '@/services/resources/addresses.service'
import { AddressCreate, AdressUpdate } from '@/common/types/address.types'

export const useAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesService.getAll()
  })
}

export const useCreateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddressCreate) =>
      addressesService.create<AddressCreate>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}

export const useUpdateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { id: number; data: AdressUpdate }) =>
      addressesService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}
export const useDeleteAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => addressesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}
