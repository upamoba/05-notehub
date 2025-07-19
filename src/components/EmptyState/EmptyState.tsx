import type {FC}from 'react';
import styles from'./EmptyState.module.css';
interface P{message?:string;}
const ES:FC<P>=({message='No items found.'})=> <p className={styles.text}>{message}</p>;

export default ES;