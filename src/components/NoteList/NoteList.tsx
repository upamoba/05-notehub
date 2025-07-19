import type { FC } from 'react';
import type { Note } from '../../types/note';
import styles from './NoteList.module.css';



interface NoteListProps{
  notes:Note[];
  onDelete:(id:string)=>void;}
const NoteList:FC<NoteListProps>=({notes, onDelete})=>{
  if(!notes.length)return null;
  return (
    <ul className={styles.list}>
      {notes.map(note=>(
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.text}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button className={styles.button} onClick={()=>onDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;