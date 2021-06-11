import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Loader from '../../components/Loading';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, protect }) => {
  const { loading, user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (protect) {
      if (!!!user) {
        router.push('/');
      } else setShow(true);
    } else {
      setShow(true);
    }

    return () => {};
  }, [user, loading]);

  if (loading && protect) {
    return <div>loading</div>;
  }

  return show && children;
};

export default PrivateRoute;
