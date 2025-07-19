export interface Note {
  id: string;
  title: string;
  text: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface FetchNotesResponse {
  data: Note[];
  meta: PaginationMeta;
}