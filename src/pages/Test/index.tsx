import classes from './style.module.css';
export default function Test() {
  return (
    <div className='relative flex justify-center items-center'>
      <div className={classes['liquid-glass-card']}></div>
      <img
        width={600}
        src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png'
      />
    </div>
  );
}
