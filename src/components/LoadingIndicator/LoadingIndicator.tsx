import type {FC}from 'react';
import styles from'./LoadingIndicator.module.css';

interface LoadingIndicatorProps{message?:string;}

const LoadingIndicator:FC<LoadingIndicatorProps>=({message='Loading…'})=> 
<div className={styles.backdrop}>
    <div className={styles.spinner} aria-label="Loading">
        </div><p className={styles.text}>{message}</p></div>;

export default LoadingIndicator;