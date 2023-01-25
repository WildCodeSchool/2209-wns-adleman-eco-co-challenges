import {render, screen} from '@testing-library/react';

import AuthForm from './AuthForm';

describe ('AuthForm', () => {
    it('render a button with text "Sign Up"', () => {
        render(<AuthForm />);
        expect(screen.getByTestId('signUp')).toHaveTextContent('Sign Up');
    })
})