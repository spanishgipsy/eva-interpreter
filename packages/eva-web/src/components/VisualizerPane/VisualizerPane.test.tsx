import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VisualizerPane from './VisualizerPane';

describe('<VisualizerPane />', () => {
  test('it should mount', () => {
    render(<VisualizerPane />);

    const visualizerPane = screen.getByTestId('VisualizerPane');

    expect(visualizerPane).toBeInTheDocument();
  });
});
