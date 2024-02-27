import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/fadeTransitionStyles.css';

interface AnimatedPageProps {
    children: ReactNode;
}

const FadeTransition: React.FC<AnimatedPageProps> = ({ children, ...props }) => (
    <CSSTransition
        {...props}
        timeout={300}
        classNames="fade"
    >
        {children}
    </CSSTransition>
);

export default FadeTransition;
