import type {FC,ReactNode}from 'react';
import{createPortal}from 'react-dom';
import styles from'./Modal.module.css';
import { useEffect } from 'react';

interface ModalProps{children:ReactNode;onClose:()=>void;}
const Modal:FC<ModalProps>=({children,onClose})=>{
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>e.key==='Escape'&&onClose();
    document.addEventListener('keydown',h);
    return()=>document.removeEventListener('keydown',h);
  },[onClose]);
  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e=>e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;