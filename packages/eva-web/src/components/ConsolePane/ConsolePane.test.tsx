import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConsolePane from './ConsolePane';

describe('<ConsolePane />', () => {
  test('it should mount', () => {
    render(<ConsolePane />);

    const consolePane = screen.getByTestId('ConsolePane');

    expect(consolePane).toBeInTheDocument();
  });
});
