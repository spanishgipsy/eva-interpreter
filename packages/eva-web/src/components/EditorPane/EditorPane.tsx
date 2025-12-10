import React, { type FC } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { clojure } from "@nextjournal/lang-clojure";
import {evaCodeMirrorExtensions} from "./codemirror/evaCmTheme.ts";
import './EditorPane.css';

interface EditorPaneProps extends React.HTMLAttributes<HTMLDivElement> {}

const EditorPane: FC<EditorPaneProps> = ({ className }) => (
  <div className={className + ' EditorPane'} data-testid="EditorPane">
    <CodeMirror
      className='h-full'
      value={'(var x 10)'}
      height="100%"
      theme={undefined}
      extensions={[
        clojure(),
        ...evaCodeMirrorExtensions,
      ]}
    />

  </div>
);

export default EditorPane;
