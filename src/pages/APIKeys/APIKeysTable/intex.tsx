import { generateAPIKey } from '@/api/api-key.api';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { APIKeys, APIKeysFormValue, APIKeysOptimistic } from '@/types/api-key.type';
import clsx from 'clsx';
import { startTransition, useImperativeHandle, useOptimistic, type RefObject } from 'react';

type Columns<V, T> = {
  title: string;
  tip?: string;
  dataIndex: string | string[];
  key: string;
  width?: number;
  render?: (value: V, record: T, index: number) => React.ReactNode;
};

export type APIKeysTableRef = RefObject<{
  updateData: (value: APIKeysFormValue) => void;
} | null>;

type APIKeysTableProps = {
  ref: APIKeysTableRef;
  data: APIKeys[];
  columns: Columns<APIKeys[keyof APIKeys], APIKeys>[];
  rowKey: keyof APIKeys;
  loading?: boolean;
  createKeyAction?: (value: APIKeysFormValue) => Promise<void>;
};

export default function APIKeysTable({ ref, ...props }: APIKeysTableProps) {
  const [optimisticData, setOptimisticData] = useOptimistic<APIKeysOptimistic[]>(props.data);

  useImperativeHandle(ref, () => {
    return {
      updateData: (value) => {
        const newKeys = {
          ...generateAPIKey(value),
          creating: true,
        };

        startTransition(async () => {
          setOptimisticData((prev) => [...prev, newKeys]);
          await props.createKeyAction?.(value);
        });
      },
    };
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {props.columns.map((c) => (
            <TableHead
              key={c.key}
              style={{ minWidth: c.width }}
              className='whitespace-nowrap uppercase text-[12px] font-semibold min-w-41.25 nth-of-type-[1]:pl-0'
            >
              {c.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.loading && (
          <TableRow className='hover:bg-transparent'>
            {props.columns.map((c) => (
              <TableCell key={c.key} className='text-[13px] w-full nth-of-type-[1]:pl-0'>
                <Skeleton className='h-4 w-full' />
              </TableCell>
            ))}
          </TableRow>
        )}
        {optimisticData.map((item) => (
          <TableRow key={item[props.rowKey]} className='hover:bg-transparent'>
            {props.columns.map((c, i) => (
              <TableCell
                key={c.key}
                className={clsx('text-[13px] w-full nth-of-type-[1]:pl-0', {
                  'text-muted-foreground': item.creating,
                })}
              >
                {c.render
                  ? c.render(item[c.dataIndex as keyof APIKeys], item, i)
                  : item[c.dataIndex as keyof APIKeys]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
