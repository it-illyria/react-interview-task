import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomDropdown } from 'table-form/components/select';

describe('CustomDropdown Component', () => {

    test('renders category options when optionsType is "category"', () => {
        render(<CustomDropdown optionsType="category" />);

        // Check if the category options are displayed
        expect(screen.getByText('Sidewalk Shed')).toBeInTheDocument();
        expect(screen.getByText('Scaffold')).toBeInTheDocument();
        expect(screen.getByText('Shoring')).toBeInTheDocument();
    });

    test('renders status options when optionsType is "status"', () => {
        render(<CustomDropdown optionsType="status" />);

        // Check if the status options are displayed
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('In Progress')).toBeInTheDocument();
        expect(screen.getByText('On Hold')).toBeInTheDocument();
    });
});
