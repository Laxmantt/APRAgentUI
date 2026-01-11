import React from 'react';
import { useTheme } from 'styled-components';

export function withTheme<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return (props: P) => {
        const theme = useTheme();
        return <WrappedComponent {...props} theme={theme} />;
    };
}
