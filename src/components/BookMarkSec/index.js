import { useState } from 'react';
import heart from '../../assets/icons/heart.png';
import heart_filled from '../../assets/icons/heart_filled.png';
import { axiosInstance } from '../../helpers';
import './style.scss';

function BookMarkSec({ saleType, user, Bookmarks, id, showSale }) {
  const [bookmarked, setBookmarked] = useState(
    Bookmarks ? Bookmarks.length > 0 : false
  );

  const bookMark = async () => {
    setBookmarked(true);
    try {
      await axiosInstance.post(`/bookmark/create/${id}`, {});
    } catch (err) {
      setBookmarked(false);
    }
  };

  const unBookMark = async () => {
    setBookmarked(false);
    try {
      await axiosInstance.delete(`/bookmark/${Bookmarks[0].id}`);
    } catch (err) {
      setBookmarked(true);
    }
  };

  return (
    <div className="inf flex-row j-space">
      {showSale && <p className={`inf_ix`}>For {saleType}</p>}
      {!!user ? (
        <div className="inf_iy">
          {bookmarked ? (
            <div onClick={unBookMark} className="flex-row">
              <img src={heart_filled} alt="bookmarked" />
            </div>
          ) : (
            <div onClick={bookMark} className="flex-row">
              <img src={heart} alt="bookmarked" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default BookMarkSec;
