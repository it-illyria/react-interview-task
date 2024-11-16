import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusCard } from 'table-form/components/report';

describe('StatusCard Component', () => {

    test('renders children content correctly', () => {
        render(<StatusCard>Test Content</StatusCard>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('applies correct class based on the variant prop', () => {
        const { rerender } = render(<StatusCard variant="completed">Completed</StatusCard>);

        // Check that the correct class is applied
        expect(screen.getByText('Completed')).toHaveClass('completed');

        rerender(<StatusCard variant="on-road">On Road</StatusCard>);
        expect(screen.getByText('On Road')).toHaveClass('on-road');

        rerender(<StatusCard variant="on-hold">On Hold</StatusCard>);
        expect(screen.getByText('On Hold')).toHaveClass('on-hold');
    });

    test('applies additional className if provided', () => {
        render(<StatusCard className="custom-class" variant="completed">Custom Class</StatusCard>);

        // Check that the additional class is applied
        expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
    });

    test('renders with default variant "completed" if no variant is provided', () => {
        render(<StatusCard>Default Variant</StatusCard>);
        expect(screen.getByText('Default Variant')).toHaveClass('completed');
    });
});
