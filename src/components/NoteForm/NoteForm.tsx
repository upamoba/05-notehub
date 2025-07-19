import type {FC}from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Min 3 characters')
    .max(50, 'Max 50 characters')
    .required('Required'),
  text: Yup.string().max(500, 'Max 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as NoteTag[])
    .required('Required'),
});

const NoteForm: FC<NoteFormProps> = ({ onSubmit, onCancel }) => (
  <Formik<NoteFormValues>
    initialValues={{ title: '', content: '', tag: 'Todo' }}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    }}
  >
    {() => (
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" className={styles.input} />
          <ErrorMessage name="title" component="span" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="text">Content</label>
          <Field
            as="textarea"
            id="text"
            name="text"
            rows={8}
            className={styles.textarea}
          />
          <ErrorMessage name="text" component="span" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={styles.select}>
            {['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default NoteForm;