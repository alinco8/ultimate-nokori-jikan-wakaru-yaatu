import { createContext, useContext, useState } from 'react';

export const DisabledContext = createContext<{
    isDisabled: boolean;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    isDisabled: false,
    setDisabled: () => {},
});

export const createDisabled = (value: boolean) => {
    const [isDisabled, setDisabled] = useState(value);

    return {
        isDisabled,
        setDisabled,
    };
};

export const DisableProvider = (
    { children, isDisabled, setDisabled }: {
        children: React.ReactNode;
        isDisabled: boolean;
        setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    },
) => {
    return (
        <DisabledContext.Provider
            value={{ isDisabled, setDisabled }}
        >
            {children}
        </DisabledContext.Provider>
    );
};

export const useDisabled = () => {
    const { isDisabled, setDisabled } = useContext(
        DisabledContext,
    );

    return { isDisabled, setDisabled };
};
