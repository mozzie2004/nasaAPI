import React from 'react';
import { GridList, GridListTile, Button, CircularProgress } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Error from '../error/error';
import styles from './galary.module.scss';

const Galary = ({ data, onLoadMore, loading, loadingMore, error }) => {

  const matches = useMediaQuery('(max-width:1200px)');
  const matchesMobile = useMediaQuery('(max-width:576px)');

  const btnDisabled = data.length < 25 || !!(data.length % 25);
  let cols = matches && matchesMobile ? 1 : matches ? 2 : 4;

  const imgList = (
    <GridList cellHeight={325} cols={cols} className={styles.gridList}>
      {data.map((item) => (
        <GridListTile key={item.id}>
          <img src={item.img_src} alt={item.camera.name} />
        </GridListTile>
      ))}
    </GridList>
  );

  const content = loading ? <CircularProgress /> : error ? <Error message={error} /> : imgList;

  return (
    <>
      <div className={styles.root}>{!data.length ? 'nothing found, change query' : content}</div>
      <div className={styles.btnLoad}>
        <Button
          onClick={onLoadMore}
          disabled={btnDisabled || loadingMore}
          variant="contained"
          color="primary"
        >
          Load more…
        </Button>
      </div>
    </>
  );
};

export default Galary;
