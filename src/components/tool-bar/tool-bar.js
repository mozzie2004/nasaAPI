import React from 'react';
import { AppBar } from '@material-ui/core';

import styles from './tool-bar.module.scss';

const ToolBar = () => {
    return (
        <AppBar>
            <h1 className={styles.title}>
                Mars Rover Photos
            </h1>
        </AppBar>
    )
}

export default ToolBar;