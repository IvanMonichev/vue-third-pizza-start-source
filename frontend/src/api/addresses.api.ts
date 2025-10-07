import { AddressCreate, AddressUpdate } from '@/common/types/address.types'
import { addressesService } from '@/services/resources/addresses.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const useAddressesQuery = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesService.getAll()
  })
}

export const useCreateAddressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddressCreate) =>
      addressesService.create<AddressCreate>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { id: number; data: AddressUpdate }) =>
      addressesService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}
export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => addressesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    }
  })
}
