import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse, CreateNotePayload } from '../../services/noteService';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm, { NoteFormValues } from '../NoteForm/NoteForm';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EmptyState from '../EmptyState/EmptyState';
import styles from './App.module.css';

const PER_PAGE = 12;

const App: React.FC = () => {
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState('');
  const [debSearch]=useDebounce(search,500);
  const [open,setOpen]=useState(false);
  const qc=useQueryClient();
  const{data,isLoading,isError}
  =useQuery<FetchNotesResponse>
  (['notes',page,debSearch],
    ()=>fetchNotes(page,PER_PAGE,debSearch),
    {keepPreviousData:true,staleTime:60000});
  
  
  const cMut=useMutation<Note,unknown,CreateNotePayload>(createNote,{onSuccess:()=>qc.invalidateQueries(['notes'])});
 
  const dMut=useMutation<void,unknown,string>(deleteNote,{onSuccess:()=>qc.invalidateQueries(['notes'])});
  const onSearch=(v:string)=>{setSearch(v);setPage(1);};
  const onCreate=(v:NoteFormValues)=>{cMut.mutate({title:v.title,text:v.text,tag:v.tag});setOpen(false);};
  const onDelete=(id:string)=>dMut.mutate(id);
  return <div className={styles.app}>
    <header className={styles.toolbar}>
      <SearchBox value={search} onChange={onSearch}/>
      {data?.meta.totalPages!>1&&<Pagination
       pageCount={data.meta.totalPages} 
       currentPage={page} onPageChange={setPage}/>}
       <button className={styles.createBtn} 
       onClick={()=>setOpen(true)}>Create note +</button>
       </header>{isLoading?<LoadingIndicator 
       message="Loading notes…"/>:isError?<ErrorMessage 
       message="Error loading notes."/>:data&&data.data.length>0?
       <NoteList notes={data.data} onDelete={onDelete}/>:<EmptyState 
       message="No notes found."/>}
       {open&&<Modal onClose={()=>setOpen(false)}>
        <NoteForm onSubmit={onCreate} 
        onCancel={()=>setOpen(false)}/></Modal>}</div>;
};
export default App;