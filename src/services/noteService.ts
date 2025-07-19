
import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

export interface PaginationMeta { page: number; perPage: number; totalPages: number; totalItems: number; }

export interface FetchNotesResponse { data: Note[]; meta: PaginationMeta; }
export interface CreateNotePayload { title: string; text: string; tag: NoteTag; }

const API = axios.create({ baseURL: 'https://notehub-public.goit.study/api', headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` } });

export const fetchNotes = async (page: number, perPage: number, search?: string): Promise<FetchNotesResponse> => {
  const params: Record<string, string|number> = { page, perPage }; if (search) params.search = search;
  const { data } = await API.get<FetchNotesResponse>('/notes', { params }); return data;
};
export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await API.post<Note>('/notes', payload); return data;
};
export const deleteNote = async (id: string): Promise<void> => { await API.delete(`/notes/${id}`); };