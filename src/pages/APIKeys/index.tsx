import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import APIKeysTable from './APIKeysTable/intex';

const mocked = [
  {
    id: 1,
    name: 'Secret key',
    status: 'Active',
    tracking_id: 'key_DlYgOSGundGD2Aq1',
    secret_key: 'sk-...1hAA',
    created: 'Apr 13, 2026',
    last_used: 'Never',
    created_by: 'Leo Leomhart',
    permissions: 'All',
  },
  {
    id: 2,
    name: 'Secret key',
    status: 'Active',
    tracking_id: 'key_DlYgOSGundGD2Aq1',
    secret_key: 'sk-...1hAA',
    created: 'Apr 15, 2026',
    last_used: 'Never',
    created_by: 'Leo Leomhart',
    permissions: 'All',
  },
];

export default function APIKeys() {
  const [active, setActive] = useState('project');

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<typeof mocked>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
      setData(mocked);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <header className='flex flex-col gap-3 mb-6'>
        <div className='flex flex-row flex-wrap gap-3 justify-between items-start'>
          <h1 className='scroll-m-20 text-[20px] font-semibold tracking-tight text-balance'>
            API Keys
          </h1>
          <Button className='h-8'>
            <IconPlus />
            Create new secret key
          </Button>
        </div>
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
              render: (_, r) => (
                <div className='inline-flex'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='[&_svg]:w-5! [&_svg]:h-5!'
                    onClick={() => console.log(r)}
                  >
                    <IconEdit />
                  </Button>
                  <Button
                    variant='destructive'
                    size='icon'
                    className='[&_svg]:w-5! [&_svg]:h-5! not-hover:bg-transparent dark:not-hover:bg-transparent'
                    onClick={() => console.log(r)}
                  >
                    <IconTrash />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
