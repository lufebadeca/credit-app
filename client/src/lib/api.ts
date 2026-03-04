const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function parseResponse(res: Response) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Respuesta inválida del servidor');
  }
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await parseResponse(res);
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Error al iniciar sesión');
  return data as { token: string; user: { id: string; email: string } };
}

export async function getCreditsCount(): Promise<number> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/credits/count`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await parseResponse(res);
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Error al obtener total');
  return (data as { count: number }).count;
}

export async function getCredit(id: string) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/credits/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await parseResponse(res);
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Error al cargar crédito');
  return data;
}

export async function getCredits(params?: {
  nombre?: string;
  cedula?: string;
  comercial?: string;
  sort?: string;
  order?: string;
}) {
  const search = new URLSearchParams();
  if (params?.nombre) search.set('nombre', params.nombre);
  if (params?.cedula) search.set('cedula', params.cedula);
  if (params?.comercial) search.set('comercial', params.comercial);
  if (params?.sort) search.set('sort', params.sort);
  if (params?.order) search.set('order', params.order);

  const token = getToken();
  const res = await fetch(`${API_BASE}/credits?${search}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await parseResponse(res);
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Error al cargar créditos');
  return data;
}

export async function createCredit(credit: {
  nombreCliente: string;
  cedulaId: string;
  valorCredito: number;
  tasaInteres: number;
  plazoMeses: number;
  comercialRegistra: string;
}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/credits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(credit)
  });
  const data = await parseResponse(res);
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Error al registrar crédito');
  return data;
}
