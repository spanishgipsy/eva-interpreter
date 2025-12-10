import type { FC } from 'react';
import './VisualizerPane.css';

interface VisualizerPaneProps {}

const VisualizerPane: FC<VisualizerPaneProps> = () => (
  <div className="VisualizerPane" data-testid="VisualizerPane">
    VisualizerPane Component
  </div>
);

export default VisualizerPane;
