import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Form from '@components/input/form';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Form', () => {
  test('calls handleSubmit with formatted payload from select, checkbox, and text inputs', async () => {
    render(
      <Form
        onSubmit={async (data) => {
          await fetch('/mock', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        }}
      >
        <label htmlFor="text">Text</label>
        <input type="text" id="text" name="text" />

        <label htmlFor="checkbox">Checkbox</label>
        <input type="checkbox" id="checkbox" name="checkbox" />

        <label htmlFor="select">Select</label>
        <select name="select" id="select" multiple>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>

        <button type="submit">Submit</button>
      </Form>
    );

    userEvent.click(screen.getByText('Checkbox'));
    expect(screen.getByLabelText('Checkbox')).toBeChecked();

    userEvent.type(screen.getByLabelText('Text'), 'Test Input');
    expect(screen.getByLabelText('Text')).toHaveValue('Test Input');

    userEvent.selectOptions(screen.getByRole('listbox'), ['a', 'b']);
    expect(screen.getByRole('option', { name: 'A' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'B' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'C' }).selected).toBe(false);

    userEvent.click(screen.getByText('Submit'));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({
      checkbox: true,
      text: 'Test Input',
      select: ['a','b'],
    }));
  });

  test('calls onInput with updated model', async () => {
    const onInput = jest.fn();
    render(
      <Form
        onInput={onInput}
      >
        <label htmlFor="text">Text</label>
        <input type="text" id="text" name="text" />
      </Form>
    );

    userEvent.type(screen.getByLabelText('Text'), 'Test');
    expect(screen.getByLabelText('Text')).toHaveValue('Test');

    expect(onInput.mock.calls.length).toEqual(4);
    expect(onInput.mock.calls[0][0]).toEqual({text: 'T'});
    expect(onInput.mock.calls[1][0]).toEqual({text: 'Te'});
    expect(onInput.mock.calls[2][0]).toEqual({text: 'Tes'});
    expect(onInput.mock.calls[3][0]).toEqual({text: 'Test'});
  });
});

