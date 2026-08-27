export type Logs = {
  content: string;
  level: string;
  time: string;
};

export type LogsContent = {
  caller: string;
  device_id: string;
  level: string;
  msg: string;
  run_mode: string;
  source: string;
  time: string;
};
