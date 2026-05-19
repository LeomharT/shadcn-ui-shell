export type APIKeys = {
  id: string;
  name: string;
  status: string;
  tracking_id: string;
  secret_key: string;
  created: string;
  last_used: string;
  created_by: string;
  permissions: string;
};

export type APIKeysOptimistic = APIKeys & {
  creating?: boolean;
  deleting?: boolean;
};

export type APIKeysFormValue = {
  name: string;
  project: string;
  permissions: string;
};
