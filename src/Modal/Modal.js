import React from 'react';
import ReactModal from 'react-modal';
import Button from '../Button/Button.js';
import styles from './Modal.scss';
import SvgX from '../svg/X.js';

function Modal(props) {
  const modalStyles = {
    overlay: {
      // Overriding defaults
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 11 + (props.zIndex || 0),
      backgroundColor: 'rgba(30, 30, 30, 0.55)',
      // Overriding defaults - END
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflowY: 'auto'
    },
    content: {
      // Overriding defaults
      position: 'relative',
      top: '50px',
      left: '0px',
      right: '0px',
      bottom: 'initial',
      border: 'none',
      overflow: 'initial',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      borderRadius: '0px',
      padding: '0px',
      // Overriding defaults - END
      backgroundColor: 'transparent',
      marginBottom: '0px'
    }
  };

  const modalClasses = `${styles.modal} ${styles[props.style]}`;

  return (
    <ReactModal
      isOpen={props.isOpen}
      onCancel={props.onCancel}
      style={modalStyles}
      className={modalClasses}
      >
      {props.children}
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  hideFooter: React.PropTypes.bool,
  hideHeader: React.PropTypes.bool,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onOk: React.PropTypes.func,
  style: React.PropTypes.oneOf([null, 'red', 'blue', 'green', 'lightGreen', 'plain']),
  title: React.PropTypes.node,
  zIndex: React.PropTypes.number,
  children: React.PropTypes.any
};

Modal.defaultProps = {
  onOk: () => { },
  style: 'blue'
};

export default Modal;
