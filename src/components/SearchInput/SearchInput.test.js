import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  test('renders without errors', () => {
    render(<SearchInput searchInput="" handleChange={() => {}} />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('displays the correct initial value', () => {
    const initialValue = 'Initial Value';
    render(<SearchInput searchInput={initialValue} handleChange={() => {}} />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(initialValue);
  });

  test('calls handleChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<SearchInput searchInput="" handleChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'example' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('updates the input value when searchInput prop changes', () => {
    const { rerender } = render(<SearchInput searchInput="initial" handleChange={() => {}} />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('initial');

    rerender(<SearchInput searchInput="updated" handleChange={() => {}} />);
    expect(inputElement).toHaveValue('updated');
  });
});
