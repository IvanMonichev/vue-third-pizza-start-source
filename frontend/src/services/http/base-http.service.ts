import { AxiosInstance, AxiosResponse } from 'axios'

export const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> => {
  const response = await request
  return response.data
}

export function createCrudService<R>(client: AxiosInstance, resource: string) {
  const getAll = (): Promise<Array<R>> =>
    handleRequest(client.get<Array<R>>(`/${resource}`))

  const getOne = (id: number | string): Promise<R> =>
    handleRequest(client.get<R>(`/${resource}/${id}`))

  const create = <P>(data: P): Promise<R> =>
    handleRequest(client.post<R>(`/${resource}`, data))

  const update = <P, UpdateResponse = R>(
    id: number | string,
    data: P
  ): Promise<UpdateResponse> =>
    handleRequest(client.put<UpdateResponse>(`/${resource}/${id}`, data))

  const remove = (id: number | string): Promise<void> =>
    handleRequest(client.delete<void>(`/${resource}/${id}`))

  return { getAll, create, update, remove, getOne }
}
