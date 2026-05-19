import type { APIKeys, APIKeysFormValue } from '@/types/api-key.type';
const formater = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function generateAPIKey(value: APIKeysFormValue): APIKeys {
  return {
    ...value,
    id: crypto.randomUUID() as string,
    created: formater.format(Date.now()),
    created_by: 'Leo Leomhart',
    last_used: 'Never',
    secret_key: 'sk-...1hAA',
    tracking_id: 'key_DlYgOSGundGD2Aq1',
    status: 'Active',
  };
}

export async function createKey(value: APIKeysFormValue): Promise<APIKeys> {
  return new Promise((r) => setTimeout(() => r(generateAPIKey(value)), 3000));
}
