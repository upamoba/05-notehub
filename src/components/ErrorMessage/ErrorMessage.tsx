import type {FC}from 'react';
import styles from'./ErrorMessage.module.css';

interface P{message?:string;}
const EM:FC<P>=({message='Something went wrong.'})=> 
<div className={styles.container} role="alert">⚠️ {message}</div>;
export default EM;