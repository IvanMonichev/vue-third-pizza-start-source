import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'
import { AddressResponse } from '@/common/types/address.types'

export const addressesService = createCrudService<AddressResponse>(
  httpClient,
  'addresses'
)
