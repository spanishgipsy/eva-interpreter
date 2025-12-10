import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditorPane from './EditorPane';

describe('<EditorPane />', () => {
  test('it should mount', () => {
    render(<EditorPane />);

    const editorPane = screen.getByTestId('EditorPane');

    expect(editorPane).toBeInTheDocument();
  });
});
