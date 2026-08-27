const PREFIX = import.meta.env.VITE_BASE_URL;

type BackendResponse<T> = {
  data: T;
  rows: T;
  code: number;
  msg: string;
  message?: string;
  total?: number;
  error?: string;
};

export default async function fetchData<T = unknown>(input: RequestInfo | URL, init?: RequestInit) {
  const defaultHeader: {
    'CONTENT-TYPE'?: string;
  } = {
    'CONTENT-TYPE': 'application/json',
  };

  if (init?.body instanceof FormData) {
    delete defaultHeader['CONTENT-TYPE'];
  }

  try {
    const res = await fetch(PREFIX + input, {
      ...init,
      headers: {
        ...defaultHeader,
        ...init?.headers,
      },
    });

    const json: BackendResponse<T> = await res.json();

    switch (json.code) {
      case 400:
      case 402:
      case 403:
      case 404:
      case 405:
      case 422:
      case 401:
      case 500:
      case 501:
      case 502:
      case 601:
        throw new Error(json.msg);
      case 200:
      default:
        break;
    }

    return json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
