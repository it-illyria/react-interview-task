import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from 'table-form/components/search';

describe('SearchInput Component', () => {

    test('renders with a placeholder', () => {
        render(<SearchInput />);
        const inputElement = screen.getByPlaceholderText('Search a driver');
        expect(inputElement).toBeInTheDocument();
    });

    test('renders MagnifyingGlass icon', () => {
        render(<SearchInput />);
        const iconElement = screen.getByTestId('magnifying-glass-icon');
        expect(iconElement).toBeInTheDocument();
    });

    test('passes props correctly to the input element', () => {
        render(<SearchInput value="Test" onChange={() => {}} />);
        const inputElement = screen.getByPlaceholderText('Search a driver');
        expect(inputElement).toHaveValue('Test');
    });

    test('handles user input correctly', () => {
        const handleChange = jest.fn();
        render(<SearchInput onChange={handleChange} />);
        const inputElement = screen.getByPlaceholderText('Search a driver');
        fireEvent.change(inputElement, { target: { value: 'New Search' } });
        expect(handleChange).toHaveBeenCalled();
        expect(inputElement).toHaveValue('New Search');
    });

});
