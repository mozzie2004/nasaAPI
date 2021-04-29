import React, { useEffect, useState } from 'react';
import Filter from '../filter/filter';
import ToolBar from '../tool-bar/tool-bar';

import Galary from '../galary/galary';
import { getData } from '../../api/api';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [curentCamera, setCurentCamera] = useState('PANCAM');
  const [sol, setSol] = useState(1);
  const [rover, setRover] = useState('opportunity');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setLoading(true);

    getData(`/${rover}/photos?camera=${curentCamera}&sol=${sol}&page=${page}`)
      .then((res) => {
        setData(res.photos);
        setLoading(false);
        setLoadingMore(false);
        setError('');
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  const onChangeCamera = (e) => {
    setCurentCamera(e.target.value);
  };

  const onChangeSol = (e) => {
    setSol(e.target.value);
  };

  const onChangeRover = (e) => {
    setRover(e.target.value);
  };

  const onLoadMore = () => {
    setError('');
    setLoadingMore(true);

    getData(`/${rover}/photos?camera=${curentCamera}&sol=${sol}&page=${page + 1}`)
      .then((res) => {
        setError('');
        if (res.photos.length) {
          setLoadingMore(false);
        }
        setData((data) => {
          return [...data, ...res.photos];
        });
        setPage((page) => page + 1);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoadingMore(false);
      });
  };

  const onFilter = (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);
    setPage(1);

    getData(`/${rover}/photos?camera=${curentCamera}&sol=${sol}&page=1`)
      .then((res) => {
        setData(res.photos);
        setError('');
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  };

  return (
    <>
      <ToolBar />
      <Filter
        onChangeCamera={onChangeCamera}
        camera={curentCamera}
        sol={sol}
        onChangeSol={onChangeSol}
        rover={rover}
        onChangeRover={onChangeRover}
        onSubmit={onFilter}
        loading={loading}
      />
      <Galary
        data={data}
        onLoadMore={onLoadMore}
        loading={loading}
        error={error}
        loadingMore={loadingMore}
      />
    </>
  );
};

export default App;
