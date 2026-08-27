import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { IconTerminal2 } from '@tabler/icons-react';
import { Virtuoso } from 'react-virtuoso';
import type { LogsContent } from '../type';
type LogsViewerProps = {
  content?: string;
};

const formater = new Intl.DateTimeFormat('zh-CN', {
  timeStyle: 'long',
});

export default function LogsViewer({ content }: LogsViewerProps) {
  if (!content) return <EmptyLogs />;

  const logs = content?.split('\n');

  return (
    <Virtuoso
      style={{ height: '100%' }}
      data={logs}
      itemContent={(_, data: string) => {
        if (!data) data = '';
        const json: LogsContent = JSON.parse(data);
        return (
          <div className='flex flex-row flex-nowrap gap-3'>
            <span className='relative pl-1 py-0.5 @md-page:pl-4 *:cursor-default text-muted-foreground select-none'>
              <div className='inline-flex cursor-pointer flex-[0_1_auto] overflow-hidden'>
                {formater.format(new Date(json.time))}
              </div>
              <span>&nbsp;</span>
            </span>
            <div className='inline-flex flex-col flex-1'>
              <span className='inline-block whitespace-pre py-0.5 pr-3 @md-page:pr-6 pl-1 @md-page:pl-3'>
                {json.msg}
              </span>
            </div>
          </div>
        );
      }}
    />
  );
}

function EmptyLogs() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <IconTerminal2 />
        </EmptyMedia>
        <EmptyTitle>No Logs Content Yet</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
