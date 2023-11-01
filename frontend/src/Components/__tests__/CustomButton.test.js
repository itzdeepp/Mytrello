import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomButton from '../CommonComponents/CustomButton';

describe('CustomButton component', () => {
    it('renders label when not processing', () => {
        const label = 'Click Me';
        const { getByText, queryByText, queryByTestId } = render(
          <CustomButton label={label} onClick={() => {}} isProcessing={false} />
        );
      
        const buttonElement = getByText(label);
        const spinnerElement = queryByTestId('spinner'); // Use queryByTestId
        expect(buttonElement).toBeInTheDocument();
        expect(spinnerElement).toBeNull(); // Assert that spinner is not present
      });

  it('renders spinner and "Please Wait" text when processing', () => {
    const label = 'Click Me';
    const { getByText, getByTestId, queryByText } = render(
      <CustomButton label={label} onClick={() => {}} isProcessing={true} />
    );

    const spinnerElement = getByTestId('spinner');
    const pleaseWaitElement = getByText('Please Wait');
    const labelElement = queryByText(label);
    expect(spinnerElement).toBeInTheDocument();
    expect(pleaseWaitElement).toBeInTheDocument();
    expect(labelElement).toBeNull();
  });

  it('calls onClick function when clicked and not processing', () => {
    const label = 'Click Me';
    const onClickMock = jest.fn();
    const { getByText } = render(
      <CustomButton label={label} onClick={onClickMock} isProcessing={false} />
    );

    const buttonElement = getByText(label);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  
});
