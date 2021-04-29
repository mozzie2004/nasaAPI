import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';

import { cameraList } from '../../data/cameras-list';
import styles from './filter.module.scss';

const Filter = ({
  camera,
  onChangeCamera,
  sol,
  onChangeSol,
  rover,
  onChangeRover,
  onSubmit,
  loading,
}) => {
  const roverOptions = ['curiosity', 'opportunity', 'spirit'];
  const camerasFiltered = cameraList.filter((item) => item[rover]);

  return (
    <div className={styles.root}>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormControl>
          <InputLabel htmlFor="rover">Rover</InputLabel>
          <Select
            value={rover}
            onChange={onChangeRover}
            inputProps={{
              name: 'rover',
              id: 'rover',
            }}
          >
            {roverOptions.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="camera">Camera</InputLabel>
          <Select
            value={camera}
            onChange={onChangeCamera}
            inputProps={{
              name: 'camera',
              id: 'camera',
            }}
          >
            {camerasFiltered.map((item, i) => (
              <MenuItem key={i} value={item.abbreviation}>
                {item.abbreviation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={styles.sol}
          id="standard-number"
          label="Sol"
          type="number"
          value={sol}
          onChange={onChangeSol}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button disabled={loading} variant="contained" color="primary" type="submit">
          to apply
        </Button>
      </form>
    </div>
  );
};

export default Filter;
