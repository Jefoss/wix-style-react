import React from 'react';
import styles from './Input.scss';
import classNames from 'classnames';
import SvgExclamation from '../svg/Exclamation.js';
import MagnifyingGlass from '../svg/MagnifyingGlass.js';
import SvgX from '../svg/X.js';

class Input extends React.Component {

  constructor(params) {
    super(params);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }

  render() {
    const {
      id,
      style,
      value,
      forceHover,
      forceFocus,
      placeholder,
      error,
      unit,
      magnifyingGlass,
      defaultValue,
      tabIndex,
      onChange,
      onClear,
      rtl,
      autoFocus,
      onKeyUp,
      onBlur
    } = this.props;

    let {theme} = this.props; // When deprecation ends. theme should move to const.

    const inputClasses = forceFocus ? styles.focus : (forceHover ? styles.hover : '');

    const exclamation = error ? (
      <div className={styles.exclamation}>
        <SvgExclamation width={2} height={11}/>
      </div>) : null;

    const unitDom = unit ? <div className={styles.unit} onClick={this._focus}>{unit}</div> : null;

    const clearButtonDom = !!onClear && !error && !!value ?
      <div onClick={onClear} className={classNames([styles.clear_button, styles.end_pos])}><SvgX width={6} height={6} thickness={1}/></div> : null;

    const magnifyingGlassDom = magnifyingGlass && !clearButtonDom && !error ?
      <div className={classNames([styles.magnifying_glass, styles.end_pos])} onClick={this._focus}><MagnifyingGlass alignLeft={!rtl}/></div> : null;

    if (style) {
      console.warn('[wix-style-react>Input] Warning. Property \'style\' has been deprecated, and will be removed Jan 1st 2017. Please use \'theme\' instead.');
      theme = style;
    }

    const classes = classNames({
      [styles.iconLeft]: !!this.props.iconLeft,
      [styles.input]: true,
      [styles[theme]]: true,
      [styles.rtl]: !!rtl,
      [styles.error]: !!error,
      [styles.endpadding]: !!magnifyingGlass || !!error,
      [styles.inputWithUnit]: !!unit
    });

    return (
      <div className={classes} onDoubleClick={this._onDoubleClickMargin} id={id} >
        {this.props.iconLeft}
        {unitDom}
        <input
          ref="input"
          className={inputClasses}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onFocus={this._onFocus}
          onBlur={onBlur}
          onKeyDown={this._onKeyDown}
          onDoubleClick={this._onDoubleClick}
          placeholder={placeholder}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          onKeyUp={onKeyUp}
          />

        {exclamation}

        {magnifyingGlassDom}
        {clearButtonDom}

      </div>
    );
  }

  focus() {
    this.refs.input.focus();
  }

  blur() {
    this.refs.input.blur();
  }

  select() {
    this.refs.input.select();
  }

  _onFocus() {
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      this.select();
    }
  }

  _onKeyDown(e) {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  theme: 'normal'
};

Input.propTypes = {
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  style: React.PropTypes.oneOf(['normal', 'paneltitle']),
  theme: React.PropTypes.oneOf(['normal', 'paneltitle']),
  forceHover: React.PropTypes.bool,
  forceFocus: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  error: React.PropTypes.bool,
  unit: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  tabIndex: React.PropTypes.number,
  magnifyingGlass: React.PropTypes.bool,
  rtl: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  autoSelect: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onClear: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onEscapePressed: React.PropTypes.func,
  onEnterPressed: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  iconLeft: React.PropTypes.object
};

export default Input;