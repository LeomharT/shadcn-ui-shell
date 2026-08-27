import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QUERY_KEYS } from '@/constant/query-keys';
import { getLogsContent } from '@/features/logs/api';
import LogsPlaceholder from '@/features/logs/components/LogsPlaceholder';
import LogsViewer from '@/features/logs/components/LogsViewer';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

const LOG_API_VALUES = ['data-receive', 'edge-core'] as const;
const DEFAULT_API = 'data-receive';

export default function Logs() {
  const [search, setSearch] = useSearchParams({ api: DEFAULT_API });

  const active = search.get('api') ?? 'data-receive';

  const query = useQuery({
    queryKey: QUERY_KEYS.LOGS.LIST,
    queryFn: getLogsContent,
  });

  function handleTabsChange(value: (typeof LOG_API_VALUES)[number]) {
    setSearch((prev) => {
      const next = new URLSearchParams(prev);
      next.set('api', value);

      return next;
    });
  }

  return (
    <div className='h-full flex flex-col'>
      <header className='flex flex-col gap-3 mb-6'>
        <div className='flex flex-row flex-wrap gap-3 justify-between items-start'>
          <h1 className='h-8 scroll-m-20 text-[20px] font-semibold tracking-tight text-balance'>
            Logs
          </h1>
        </div>
        <div className='flex flex-col gap-0.75'>
          <Tabs
            value={active}
            onValueChange={(val) => handleTabsChange(val as (typeof LOG_API_VALUES)[number])}
          >
            <TabsList variant='line' className='p-0 gap-5'>
              <TabsTrigger className='p-0 [&:after]:h-px' value='data-receive'>
                Data Receive
              </TabsTrigger>
              <TabsTrigger className='p-0 [&:after]:h-px' value='edge-core'>
                Edge Core
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Separator />
        </div>
      </header>
      <Card className='h-full flex p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-accent'>
        {query.isFetching ? <LogsPlaceholder /> : <LogsViewer content={query.data?.data.content} />}
      </Card>
    </div>
  );
}
