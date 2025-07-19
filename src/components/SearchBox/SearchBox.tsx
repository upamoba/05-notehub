import type { FC, ChangeEvent } from 'react';
import styles from './SearchBox.module.css';

interface Props{value:string;onChange:(v:string)=>void;}
const SearchBox:FC<Props> =({value,onChange})=>
  {const h=(e:ChangeEvent<HTMLInputElement>)=>onChange(e.target.value);
  return <input className={styles.input}
   type="text" 
   placeholder="Search notes" 
   value={value} 
   onChange={h}/>;}


export default SearchBox;