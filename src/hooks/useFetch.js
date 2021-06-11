import { useState, useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { log_out } from 'g_actions/user';
import loadObj from './loader';

const useFetch = (
  dispatch,
  initailLoadingState,
  reload,
  name,
  dependencyVar,
  runOnDone = () => {}
) => {
  if (!loadObj.hasOwnProperty(name)) {
    loadObj[name] = {
      loading: initailLoadingState,
    };
  }

  const [loading, setLoading] = useState(loadObj[name].loading);
  const [timeOut, setTimeOut] = useState(1000);
  const [error, setError] = useState();
  const [cb, fetch] = useState();
  const [running, setRunning] = useState(false);
  const { addToast } = useToasts();
  const previousDependencyVar = useRef();
  // const mounted = useRef(true);

  useEffect(() => {
    if (loadObj[name]) return;
    if (!dependencyVar) return;
    if (dependencyVar === previousDependencyVar.current) return;

    restart();
    previousDependencyVar.current = dependencyVar;
  }, [dependencyVar, loading]);

  useEffect(() => {
    let timeOutID;

    (async () => {
      if (!cb) return;
      if (loadObj[name].started) return;

      try {
        loadObj[name].loading = true;
        loadObj[name].started = true;
        setLoading(true);

        dispatch ? await dispatch(cb) : await (() => cb)();

        // if (!mounted.current) return;

        loadObj[name].loading = false;
        setError(null);
        setLoading(false);
        runOnDone();

        // }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          addToast('Session expired, please login again', {
            appearance: 'error',
            autoDismiss: true,
          });
          dispatch(log_out());
          return;
        }

        if ((!err.response || err.response.status === 500) && reload) {
          if (running) return;
          setRunning(true);

          timeOutID = setTimeout(function() {
            setRunning(false);
            loadObj[name].started = false;
            let time;

            if (timeOut > 5000) {
              time = timeOut;
            } else {
              time = timeOut === 1000 ? 2000 : timeOut * 2;
            }

            setTimeOut(time);
          }, timeOut);
          return;
        }

        setError(true);
        loadObj[name].started = true;
        loadObj[name].loading = false;
        setLoading(false);
      }
    })();

    return () => {
      clearTimeout(timeOutID);
    };
  }, [cb, timeOut, reload, dispatch, running, addToast, loading]);

  const restart = () => {
    loadObj[name].loading = true;
    loadObj[name].started = false;
    setLoading(!loading);
  };

  return [loadObj[name]?.loading, error, fetch, restart];
};

export default useFetch;
