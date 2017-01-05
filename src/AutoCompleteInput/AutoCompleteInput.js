import React from 'react';
import styles from './AutoCompleteInput.scss';
import Input from '../Input/Input.js';
import isEqual from 'lodash.isequal';
import isobject from 'lodash.isobject';
import has from 'lodash.has';
import isstring from 'lodash.isstring';
import trim from 'lodash.trim';
import DropdownLayout from '../DropdownLayout/DropdownLayout';

const NOT_SELECTED_ID = -1;

const initialState = {
  selectedId: NOT_SELECTED_ID,
  showOptions: false,
};

const isLegalSuggestion = suggestion => {
  if (isobject(suggestion)) {
    return (has(suggestion, 'id') && (trim(suggestion.id).length > 0)) &&
      has(suggestion, 'value') && isstring(suggestion.value) && (trim(suggestion.value).length > 0);
  } else {
    return isstring(suggestion) && trim(suggestion).length > 0;
  }
};

class AutoCompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};

    this.onSelect = this.onSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.suggestions, nextProps.suggestions)) {
      if (nextProps.suggestions.some(suggestion => !isLegalSuggestion(suggestion))) {
        throw new Error('AutoCompleteInput: Invalid suggestion provided');
      }
      this.setState({
        selectedId: NOT_SELECTED_ID,
      });
    }
  }

  render() {
    return (
      <div className={styles.wrapper} onFocus={this.onFocus} onKeyDown={this.onKeyDown} onBlur={this.onBlur}>
        <Input
          menuArrow
          ref={input => this.input = input}
          {...this.props}
          />

        <DropdownLayout
          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
          options={this.props.suggestions}
          selectedId={this.state.selectedId}
          visible={this.state.showOptions}
          onClose={this.onBlur}
          onSelect={this.onSelect}
          />
      </div>
    );
  }

  onSelect(optionId) {
    const {suggestions, value} = this.props;
    if (optionId === NOT_SELECTED_ID || suggestions.length === 0) {
      this.props.onSelect({id: 'not a suggested option', value});
    } else {
      this.props.onSelect(suggestions.find(suggestion => suggestion.id === optionId));
    }
    this.onBlur();
  }

  onBlur(event) {
    this.setState(initialState);

    this.input.blur();
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  onFocus(event) {
    this.setState({showOptions: true});

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  onKeyDown(event) {
    this.dropdownLayout._onKeyDown(event);

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
}

AutoCompleteInput.defaultProps = {
  ...Input.defaultProps,
  OnSelect: () => {},
  suggestions: [],
};

AutoCompleteInput.propTypes = {
  ...Input.propTypes,
  suggestions: React.PropTypes.arrayOf((propValue, key) => {
    if (!isLegalSuggestion(propValue[key])) {
      return new Error(`AutoCompleteInput: Invalid Prop suggestions was given. Validation failed on the suggestion number ${key}`);
    }
  }),
  onSelect: React.PropTypes.func
};

AutoCompleteInput.displayName = 'AutoCompleteInput';

export default AutoCompleteInput;
