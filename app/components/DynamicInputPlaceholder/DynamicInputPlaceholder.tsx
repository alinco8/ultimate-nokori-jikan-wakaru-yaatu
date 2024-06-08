import styles from './style.module.scss';

interface DynamicInputProps {
    text: string;
    color: string;
}
export const DynamicInputPlaceholder = ({ text, color }: DynamicInputProps) => {
    return (
        <div
            className={styles.dynamicInputPlaceholder}
            style={{ background: color }}
        >
            {text}
        </div>
    );
};
