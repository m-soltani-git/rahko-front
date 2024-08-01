import React, { useEffect, useState } from 'react';
import PopupHandler from './PopupHandler';
import graph from './graph';

import { useSelector } from 'react-redux';
import { isEmptyObject } from 'helpers/formatObject';
import { useLazyQuery } from '@apollo/client';

export default function MainModel(props) {
  const { initFilter, isPopup = false } = props;
  const init = { ...initFilter };

  const [startFetch, setStartFetch] = useState(!isPopup);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState(init);
  const { userToken } = useSelector((state) => state.auth);

  const clearFilter = () => setFilter(init);

  const handleSetFilter = (filter) => {
    setPage(1);
    setResult([]);
    setFilter(filter);
  };

  const [getData, { loading }] = useLazyQuery(graph.list.query, {
    context: {
      serviceName: graph.list.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const refresh = () => {
    setPage(1);
    setResult([]);
    setFlag(!flag);
  };

  const handleData = async (paginate) => {
    try {
      const { data, error } = await getData({
        variables: {
          ...filter,
          page,
          limit,
        },
      });
      if (!isEmptyObject(data) && !error) {
        const res = data[graph.list.name];
        setTotal(res?.total);
        paginate ? setResult((prevData) => prevData.concat(res?.data)) : setResult(res?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    startFetch && handleData(page > 1);
  }, [startFetch, page, filter, flag]);

  return (
    <PopupHandler
      page={page}
      limit={limit}
      total={total}
      result={result}
      filter={filter}
      loading={loading}
      refetch={refresh}
      setPage={setPage}
      isPopup={isPopup}
      clearFilter={clearFilter}
      setFilter={handleSetFilter}
      setStartFetch={setStartFetch}
      {...props}
    />
  );
}
