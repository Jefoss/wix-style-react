import React from 'react';
import styles from './Button.scss';
import {shallow} from 'enzyme';
import Button from './Button';

const driverFactory = component => ({
  click: () => component.simulate('click'),
  getButtonChildren: () => component.text(),
  isButtonDisabled: () => component.hasClass(styles.disabled),
  doesComponentHasClass: className => component.hasClass(className),
  isComponentHovered: () => component.hasClass(styles.hover)
});

const componentFactory = () => {
  const createShallow = (props = {}) => {
    const {children, ...otherProps} = props;
    return shallow(
      <Button {...otherProps}>{children}</Button>
    );
  };

  return {createShallow};
};

export {componentFactory, driverFactory};
