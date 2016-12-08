import React from 'react';
import * as styles from './HeaderLayout1.scss';
import SvgX from '../svg/X.js';
import classNames from 'classnames';


const HeaderLayout1 = ({title, onCancel, style}) => {
  return (
    <div className={classNames(styles.header, styles[style])} >
      {title}
      <button className={styles.close} onClick={onCancel}>
        <SvgX width={9} height={9} thickness={1} color={'white'}/>
      </button>
    </div>
  );
};

export default HeaderLayout1;



