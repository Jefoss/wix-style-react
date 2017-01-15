import React from 'react';
import {shallow, mount} from 'enzyme';
import Input from './Input';
import styles from './Input.scss';

const inputDriverFactory = component => ({
  trigger: (trigger, event) => component.find('input').simulate(trigger, event),
  clickClear: () => component.find(`.${styles.clear_button}`).simulate('click'),
  getValue: () => component.find('input').props().value,
  getDefaultValue: () => component.find('input').props().defaultValue,
  getTabIndex: () => component.find('input').props().tabIndex,
  hasExclamation: () => component.find('Exclamation').length > 0,
  hasError: () => component.hasClass(styles.error),
  getUnit: () => component.find(`.${styles.unit}`).text(),
  hasMagnifyingGlass: () => component.find(`.${styles.magnifying_glass}`).length > 0,
  hasClearButton: () => component.find(`.${styles.clear_button}`).length > 0,
  isRTL: () => component.hasClass(styles.rtl),
  hasEndWrapping: () => component.hasClass(styles.endpadding),
  isFocusedStyle: () => component.find('input').hasClass(styles.focus),
  isHoveredStyle: () => component.find('input').hasClass(styles.hover),
  isOfStyle: style => component.hasClass(styles[style]),
  isFocus: () => document.activeElement === component.find('input').node,
  exists: () => component.find('input').length === 1,
  hasIconLeft: () => component.hasClass(styles.iconLeft)
});

const componentFactory = () => {
  const createShallow = (props = {}) => {
    return shallow(
      <Input {...props}/>
    );
  };

  const createMount = (props = {}) => {
    return mount(
      <Input {...props}/>
    );
  };

  return {createShallow, createMount};
};

export {componentFactory, inputDriverFactory};
