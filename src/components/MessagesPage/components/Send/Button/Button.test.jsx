import React from 'react';
import Button from './Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom'

describe('testing Button', () => {
  it('render component Button', () => {
    render(<Button/>)
  })

  it('Button click with userEvent', async() => {
    const smt = jest.fn();
    render(<Button sendMessage={smt}/>);
    await userEvent.click(screen.getByTestId('send-btn'));
    expect(smt).toHaveBeenCalledTimes(1)
  })
})
