import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';

import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

import styles from './App.module.css';

const PER_PAGE = 12;

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ['notes', page, debouncedSearch],
    () => fetchNotes(page,  PER_PAGE, debouncedSearch),
    { keepPreviousData: true, staleTime: 60000 }
  );

  const createMut = useMutation(createNote, {
    onSuccess: () => queryClient.invalidateQueries(['notes']),
  });

  const deleteMut = useMutation(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries(['notes']),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCreate = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    createMut.mutate(note);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteMut.mutate(id);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data?.meta.totalPages! > 1 && (
          <Pagination
            pageCount={data.meta.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={styles.createBtn}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p className={styles.status}>Loading notes…</p>}
      {isError && <p className={styles.status}>Error loading notes.</p>}

      {!isLoading && data?.data.length ? (
        <NoteList notes={data.data} onDelete={handleDelete} />
      ) : (
        !isLoading && <p className={styles.status}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;