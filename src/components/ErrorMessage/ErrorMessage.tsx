import css from './ErrorMessage.module.css';
interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className={css.container}>
            <p className={css.text}>❌ {message || 'There was an error, please try again...'}</p>
        </div>
    );
};
