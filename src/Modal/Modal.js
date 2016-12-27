import React from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.scss';

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
      boxShadow: '0 0 14px 0 rgba(22, 45, 60, 0.3)',
      // Overriding defaults - END
      backgroundColor: 'transparent',
      marginBottom: '0px'
    }
  };

  const modalClasses = `${styles.modal} ${styles[props.style]}`;

  return (
    <ReactModal
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
      onRequestClose={props.onRequestClose}
      onAfterOpen={props.onAfterOpen}
      style={modalStyles}
      className={modalClasses}
      contentLabel={props.contentLabel}
      >
      {props.children}
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  contentLabel: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.func,
  style: React.PropTypes.oneOf([null, 'red', 'blue', 'green']),
  children: React.PropTypes.any,
  zIndex: React.PropTypes.number,
  shouldCloseOnOverlayClick: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  onAfterOpen: React.PropTypes.func
};

Modal.defaultProps = {
  onOk: () => { },
  style: 'blue',
  shouldCloseOnOverlayClick: false
};

export default Modal;
