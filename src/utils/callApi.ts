type Options = {
  headers?: {
    [key: string]: string
  }
  method?: string
  body?: any
}

export const callApi = async (endpoint: string, options: Options) => {
  const { headers, method = 'GET', body } = options

  const response = await fetch(endpoint, {
    method,
    headers: headers,
    body: body,
  })

  const responseObject = {
    status: response.status,
    ok: response.status >= 200 && response.status < 400,
    payload: await response.json(),
  }

  if (!responseObject.ok) {
    throw responseObject
  }

  return responseObject
}
