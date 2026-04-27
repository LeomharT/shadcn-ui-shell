import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useState, type PointerEvent } from 'react';

type Positions = 'left' | 'right' | 'forward' | 'backward';

function getPositionClassName(position: Positions) {
  const map = {
    left: 'top-[50%] left-1.5 translate-y-[-50%]',
    right: 'top-[50%] right-1.5 translate-y-[-50%]',
    forward: 'left-[50%] top-1.5 translate-x-[-50%]',
    backward: 'left-[50%] bottom-1.5 translate-x-[-50%]',
  };

  return clsx(
    map[position],
    'w-14',
    'h-14',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'absolute',
    'cursor-pointer',
    'select-none',
    'hover:bg-white',
    'rounded-full',
  );
}

function getCenterClassName(position?: Positions) {
  const map = {
    left: '-translate-x-2.5',
    right: 'translate-x-2.5',
    forward: '-translate-y-2.5',
    backward: 'translate-y-2.5',
  };

  return clsx(
    'w-[65%] h-[65%] bg-[#DFDFDF] rounded-full transition-all duration-75',
    position ? map[position] : '',
  );
}

export default function MovementControls() {
  const [position, setPosition] = useState<Positions | undefined>();

  const config = {
    forward: { icon: <IconChevronUp />, label: '前进' },
    backward: { icon: <IconChevronDown />, label: '后退' },
    left: { icon: <IconChevronLeft />, label: '左移' },
    right: { icon: <IconChevronRight />, label: '右移' },
  } as const;

  function handleOnPointerDown(e: PointerEvent<HTMLButtonElement>, key: Positions) {
    (e.target as HTMLButtonElement).setPointerCapture(e.pointerId);
    setPosition(key);
  }

  function handleOnPointerUp() {
    setPosition(undefined);
  }

  useEffect(() => {
    if (!position) return;

    const timer = setInterval(() => {
      console.log(position);
    }, 100);

    return () => clearInterval(timer);
  }, [position]);

  return (
    <div className='w-56 h-56 rounded-full bg-[#f3f3f3] relative border border-gray-300'>
      <section>
        {Object.keys(config).map((key) => (
          <button
            key={key}
            className={getPositionClassName(key as Positions)}
            onPointerDown={(e) => handleOnPointerDown(e, key as Positions)}
            onPointerUp={handleOnPointerUp}
          >
            {config[key as keyof typeof config].icon}
            {config[key as keyof typeof config].label}
          </button>
        ))}
      </section>
      <div className='absolute w-[40%] h-[40%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-full flex items-center justify-center border border-gray-300'>
        <div className={getCenterClassName(position)}></div>
      </div>
    </div>
  );
}
