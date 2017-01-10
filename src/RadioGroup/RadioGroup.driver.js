import React from 'react';
import {shallow, mount} from 'enzyme';
import RadioGroup from './RadioGroup';

const radioGroupDriverFactory = component => ({
  component: () => component,
  selectByValue: value => component.findWhere(n => n.name() === 'input' && n.node.value === value.toString()).simulate('change', value),
  getSelectedValue: () => component.props().value,
  exists: () => component.find('input').length > 1,
  radioAt: index => component.find('input').at(index),
  labelAt: index => component.childAt(index).find('label'),
  allRadios: () => component.children().find('input'),
  getClassOfLabelAt: index => component.childAt(index).find('label').node.className,
  isVerticalDisplay: () => component.find('.vertical').length > 0,
  isHorizontalDisplay: () => component.find('.horizontal').length > 0
});

const componentFactory = options => {
  const createShallow = (props = {}) => {
    return shallow(
      <RadioGroup {...props}>
        {options.map((props, index) => <RadioGroup.Radio key={index} {...props}/>)}
      </RadioGroup>
    );
  };

  const createMount = (props = {}) => {
    return mount(
      <RadioGroup {...props}>
        {options.map((props, index) => <RadioGroup.Radio key={index} {...props}/>)}
      </RadioGroup>
    );
  };

  return {createShallow, createMount};
};

export {componentFactory, radioGroupDriverFactory};
