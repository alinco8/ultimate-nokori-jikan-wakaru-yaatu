import { useCallback, useState } from 'react';
import styles from './style.module.scss';

export const AutoScaledInput = (args: React.JSX.IntrinsicElements['input']) => {
    const [text, setText] = useState('');
    const [width, setWidth] = useState<number>(0);
    const refSpan = useCallback(
        (span: HTMLSpanElement | null) => {
            if (!span) return;

            setWidth(span.getBoundingClientRect().width);
        },
        [text],
    );

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setText(e.currentTarget.value);
    };

    return (
        <div className={styles.autoScaledInput}>
            <span ref={refSpan}>{text}</span>
            <input
                type="text"
                {...args}
                onChange={onChange}
                style={{ width: `${width}px` }}
            />
        </div>
    );
};
