import { useRouter } from 'next/router';

const Button = ({ link, onClick, btnRef, children, small, className = '' }) => {
  const router = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (link) router.push(link);
  };

  return (
    <button
      ref={btnRef}
      className={`${className} btn font-semibold text-sm inline-block tracking-wider text-white border border-txt bg-black py-3.5 px-10 hover:text-txt hover:bg-white relative`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
