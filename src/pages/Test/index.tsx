export default function Test() {
  const range = 100;

  const size = range * 2;
  const halfSize = size / 2;

  const width = 40;
  const height = 30;

  return (
    <div className='flex justify-center items-center'>
      <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size}>
        {/* Center */}
        <g transform={`translate(${halfSize} ${halfSize})`}>
          <circle cx={0} cy={0} r={6} fill='#DB2C6F' />
          <rect
            stroke='#DB2C6F'
            fill='rgba(219, 44, 111, 0.25)'
            strokeWidth={2}
            x={-width / 2}
            y={-height / 2}
            rx={8}
            ry={8}
            width={width}
            height={height}
          />
          {/* <circle
            cx={0}
            cy={0}
            r={20}
            strokeWidth={2}
            fill='rgba(219, 44, 111, 0.25)'
            stroke='#DB2C6F'
          /> */}
          <line x1='20' y1='0' x2='40' y2='0' stroke='#DB2C6F' />
        </g>

        {/* Ring */}
        <g transform={`translate(${halfSize} ${halfSize})`}>
          <circle
            cx={0}
            cy={0}
            r={range}
            fill='rgba(219, 44, 111, 0.15)'
            stroke='#DB2C6F'
            strokeDasharray={3}
          />
        </g>

        {/* Cursor */}
        <g color='#DB2C6F' transform={`translate(${halfSize} ${halfSize})`}>
          <g transform='translate(40 0)'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path
              transform='translate(-13 -13)'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-pointer-2'
              d='M21.9096 12.9548L4.58551 21.0865C4.48679 21.1232 4.37961 21.1308 4.27671 21.1083C4.17382 21.0859 4.07954 21.0343 4.00507 20.9599C3.9306 20.8854 3.87907 20.7911 3.85662 20.6882C3.83417 20.5853 3.84173 20.4782 3.8784 20.3794L6.35328 12.9548L3.8784 5.53019C3.84173 5.43147 3.83417 5.32429 3.85662 5.2214C3.87907 5.1185 3.9306 5.02422 4.00507 4.94975C4.07954 4.87528 4.17382 4.82376 4.27671 4.8013C4.37961 4.77885 4.48679 4.78641 4.58551 4.82308L21.9096 12.9548Z'
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
