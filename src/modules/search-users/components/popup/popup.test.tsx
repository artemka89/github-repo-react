import { render, screen } from '@testing-library/react';

import { Popup } from './popup';

describe('popup', () => {
  const childrenText = 'Text';

  test('should not render popup', () => {
    render(<Popup isOpen={false}>{childrenText}</Popup>);
    const popupElement = screen.getByText(childrenText);
    expect(popupElement).not.toHaveClass('visible opacity-100');
  });

  test('should render popup', () => {
    render(<Popup isOpen={true}>{childrenText}</Popup>);
    const popupElement = screen.getByText(childrenText);
    expect(popupElement).toHaveClass('visible opacity-100');
  });
});
