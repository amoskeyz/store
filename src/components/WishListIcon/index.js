import { useSelector } from 'react-redux';
import BookMarks from 'assets/icons/bookmarks';
import IconCounter from '../IconCounter';

const WishListIcon = () => {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <IconCounter
      icon={<BookMarks className="fill-current text-fade w-5 h-5" />}
      count={Object.values(items).length}
    />
  );
};

export default WishListIcon;
