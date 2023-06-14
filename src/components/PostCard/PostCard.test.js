import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

describe('PostCard', () => {
    test('renders title and body correctly', () => {
      const title = 'Test Title';
      const body = 'Test Body';
      
      render(<PostCard title={title} body={body} />);
      
      const titleElement = screen.getByText(title);
      const bodyElement = screen.getByText(body);
      
      expect(titleElement).toBeInTheDocument();
      expect(bodyElement).toBeInTheDocument();
    });
  });
  