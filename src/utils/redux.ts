export type Action<T> = {
  payload: T
  type: string
}

export type AsyncAction<T, F> = {
  payload: T
  type: string
  next: (err?: string | null, data?: F) => void
}

export const createAction = (type: string) => {
  const creator = <T>(payload?: T): Action<T | undefined> => ({
    payload,
    type,
  })

  return Object.assign(creator, { type })
}

export const createActions = (type: string) => {
  const types = createRequestActionTypes(type)
  return {
    request: createAction(types.REQUEST),
    success: createAction(types.SUCCESS),
    failed: createAction(types.FAILED),
    type: types,
    types: Object.values(types),
  }
}

export const createRequestActionTypes = (name: string) => ({
  REQUEST: `${name}_REQUEST`,
  SUCCESS: `${name}_SUCCESS`,
  FAILED: `${name}_FAILED`,
})
