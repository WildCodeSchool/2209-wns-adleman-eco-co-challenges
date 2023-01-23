import {render, screen} from '@testing-library/react';

import AuthForm from './AuthForm';

describe ('AuthForm', () => {
    it('render a button', () => {
        render(<AuthForm />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
})