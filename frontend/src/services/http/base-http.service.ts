import { AxiosInstance, AxiosResponse } from 'axios'

export const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request
    return response.data
  } catch (error: any) {
    console.error('HTTP Error:', error.response?.data || error.message)
    throw error
  }
}

export function createCrudService<Request, Response = Request>(
  client: AxiosInstance,
  resource: string
) {
  const getAll = (params?: any): Promise<Array<Response>> =>
    handleRequest(client.get<Array<Response>>(`/${resource}`, { params }))

  const getOne = (id: number | string): Promise<Response> =>
    handleRequest(client.get<Response>(`/${resource}/${id}`))

  const create = <CreateRequest = Request>(
    data: CreateRequest
  ): Promise<Response> =>
    handleRequest(client.post<Response>(`/${resource}`, data))

  const update = <UpdateRequest = Request, UpdateResponse = Response>(
    id: number | string,
    data: UpdateRequest
  ): Promise<UpdateResponse> =>
    handleRequest(client.put<UpdateResponse>(`/${resource}/${id}`, data))

  const remove = (id: number | string): Promise<void> =>
    handleRequest(client.delete<void>(`/${resource}/${id}`))

  return { getAll, getOne, create, update, remove }
}
