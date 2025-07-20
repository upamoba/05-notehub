
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  text?: string;
}

export default function EmptyState({ text }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p>{text || 'No items found.'}</p>
    </div>
  );
}