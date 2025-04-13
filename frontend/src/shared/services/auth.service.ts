import type { LoginForm, User } from '../interfaces/index';

//const BASE_URL = '/api/auth';

const BASE_PATH = import.meta.env.BASE_URL || '/';
const BASE_URL = `${BASE_PATH}api/auth`;

export async function login(loginForm: LoginForm): Promise<User> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(loginForm),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

export async function logout() {
  await fetch(BASE_URL, {
    method: 'DELETE'
  });
}
