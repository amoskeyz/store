import Link from 'next/link';
// import './style.scss';

const TitleFlip = ({ title, subtitle, link, small, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onClick();
  };

  return (
    <div className={`title relative w-full${small ? ' small' : ''}`}>
      <p
        className="text-txt visible opacity-100 duration-500 clipped-text"
        style={{ '--number': 1 }}
      >
        {title}
      </p>
      <Link href={link} onClick={handleClick}>
        <a className="absolute top-0 left-0 inline-block invisible duration-500 opacity-0">
          {subtitle}
        </a>
      </Link>
    </div>
  );
};

export default TitleFlip;
