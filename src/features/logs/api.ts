import { APIS } from '@/constant/api';
import fetchData from '@/utils/fetchData';
import type { Logs } from './type';

export function getLogsContent() {
  return fetchData<Logs>(APIS.LOGS.CONTENT);
}
