import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createKey } from '@/features/api-keys/api';
import APIKeysCreate from '@/features/api-keys/components/APIKeysCreate';
import type { APIKeysTableRef } from '@/features/api-keys/components/APIKeysTable';
import APIKeysTable from '@/features/api-keys/components/APIKeysTable';
import type { APIKeysFormValue, APIKeysOptimistic } from '@/features/api-keys/types';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { startTransition, useEffect, useRef, useState } from 'react';

const mocked = [
  {
    id: '1',
    name: 'Secret key',
    status: 'Active',
    tracking_id: 'key_DlYgOSGundGD2Aq1',
    secret_key: 'sk-...1hAA',
    created: 'Apr 13, 2026',
    last_used: 'Never',
    created_by: 'Leo Leomhart',
    permissions: 'all',
  },
  {
    id: '2',
    name: 'Secret key',
    status: 'Active',
    tracking_id: 'key_DlYgOSGundGD2Aq1',
    secret_key: 'sk-...1hAA',
    created: 'Apr 15, 2026',
    last_used: 'Never',
    created_by: 'Leo Leomhart',
    permissions: 'all',
  },
];

export default function APIKeys() {
  const table: APIKeysTableRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [active, setActive] = useState('project');

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<typeof mocked>([]);

  function handleOnCreate(val: APIKeysFormValue) {
    setOpen(false);
    table.current?.updateData(val);
  }

  async function createKeyAction(value: APIKeysFormValue) {
    const newKeyItem = await createKey(value);

    startTransition(() => {
      setData((prev) => [...prev, newKeyItem]);
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setData(mocked);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <APIKeysCreate open={open} onOpenChange={setOpen} onCreate={handleOnCreate} />
      <header className='flex flex-col gap-3 mb-6'>
        <div className='flex flex-row flex-wrap gap-3 justify-between items-start'>
          <h1 className='scroll-m-20 text-[20px] font-semibold tracking-tight text-balance'>
            API Keys
          </h1>
          <Button className='h-8' onClick={() => setOpen(true)}>
            <IconPlus />
            Create new secret key
          </Button>
        </div>
        <div className='flex flex-col gap-0.75'>
          <Tabs value={active} onValueChange={setActive}>
            <TabsList variant='line' className='p-0 gap-5'>
              <TabsTrigger className='p-0 [&:after]:h-px' value='project'>
                Project API Keys
              </TabsTrigger>
              <TabsTrigger className='p-0 [&:after]:h-px' value='user'>
                User API Keys
                <Badge className='rounded-xs bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'>
                  Legacy
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Separator />
        </div>
      </header>
      <div>
        <div className='flex flex-col gap-3'>
          <p>You have permission to view and manage all API keys in this project.</p>
          <p>
            Do not share your API key with others or expose it in the browser or other client-side
            code. To protect your account's security, OpenAI may automatically disable any API key
            that has leaked publicly.
          </p>
          <p>
            View usage per API key on the <a className='underline cursor-pointer'>Usage page.</a>
          </p>
        </div>
      </div>
      <div className='my-4.5'>
        <APIKeysTable
          ref={table}
          rowKey='id'
          loading={loading}
          data={data}
          columns={[
            { title: 'Name', key: 'Name', dataIndex: 'name' },
            { title: 'Status', key: 'Status', dataIndex: 'status' },
            { title: 'Tracking ID', key: 'Tracking ID', dataIndex: 'tracking_id', width: 195 },
            { title: 'Secret Key', key: 'Secret Key', dataIndex: 'secret_key' },
            { title: 'Created', key: 'Created', dataIndex: 'created' },
            { title: 'Last used', key: 'Last used', dataIndex: 'last_used', tip: '' },
            { title: 'Created by', key: 'Created by', dataIndex: 'created_by' },
            { title: 'Permissions', key: 'Permissions', dataIndex: 'permissions' },
            {
              title: '',
              key: 'action',
              dataIndex: 'action',
              width: 100,
              render: (_, r: APIKeysOptimistic) => (
                <div className='inline-flex'>
                  <Button
                    size='icon'
                    variant='ghost'
                    disabled={r?.creating}
                    className='[&_svg]:w-5! [&_svg]:h-5!'
                    onClick={() => console.log(r)}
                  >
                    <IconEdit />
                  </Button>
                  <Button
                    size='icon'
                    variant='destructive'
                    disabled={r?.creating}
                    className='[&_svg]:w-5! [&_svg]:h-5! not-hover:bg-transparent dark:not-hover:bg-transparent'
                    onClick={() => console.log(r)}
                  >
                    <IconTrash />
                  </Button>
                </div>
              ),
            },
          ]}
          createKeyAction={createKeyAction}
        />
      </div>
    </div>
  );
}
