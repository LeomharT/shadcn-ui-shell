import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type APIKeys = {
  id: number;
  name: string;
  status: string;
  tracking_id: string;
  secret_key: string;
  created: string;
  last_used: string;
  created_by: string;
  permissions: string;
};

type Columns<V, T> = {
  title: string;
  tip?: string;
  dataIndex: string | string[];
  key: string;
  width?: number;
  render?: (value: V, record: T, index: number) => React.ReactNode;
};

type APIKeysTableProps = {
  data: APIKeys[];
  columns: Columns<APIKeys[keyof APIKeys], APIKeys>[];
  rowKey: keyof APIKeys;
  loading?: boolean;
};

export default function APIKeysTable(props: APIKeysTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {props.columns.map((c) => (
            <TableHead
              key={c.key}
              style={{ minWidth: c.width }}
              className={
                'whitespace-nowrap uppercase text-[12px] font-semibold min-w-41.25 nth-of-type-[1]:pl-0'
              }
            >
              {c.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item) => (
          <TableRow key={item[props.rowKey]} className='hover:bg-transparent'>
            {props.columns.map((c, i) => (
              <TableCell key={c.key} className='text-[13px] w-full nth-of-type-[1]:pl-0'>
                {c.render
                  ? c.render(item[c.dataIndex as keyof (typeof props.data)[number]], item, i)
                  : item[c.dataIndex as keyof (typeof props.data)[number]]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
