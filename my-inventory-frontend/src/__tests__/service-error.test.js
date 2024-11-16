import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceError } from 'table-form/errors/service-error';

describe('ServiceError Component', () => {
    test('renders ServiceError with title and description', () => {
        const title = 'Test Title';
        const description = 'Test Description';

        render(<ServiceError title={title} description={description} />);

        // Check for the image
        const imgElement = screen.getByAltText('No Service');
        expect(imgElement).toBeInTheDocument();

        // Check for title
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();

        // Check for description
        const descriptionElement = screen.getByText(description);
        expect(descriptionElement).toBeInTheDocument();
    });
});
