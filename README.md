# Eva Programming Language

Eva is an interpreted programming language with Lisp-like S-expression syntax, implemented as an AST-based interpreter in TypeScript. The project is organized as a monorepo containing the parser, core interpreter, CLI tool, and web-based IDE.

## Features

- **S-expression syntax**: Lisp-like syntax with parentheses-based expressions
- **AST-based interpreter**: Efficient evaluation using Abstract Syntax Trees
- **Object-oriented programming**: Classes, inheritance, and method calls
- **Functional programming**: Lambda functions and higher-order functions
- **Module system**: Support for modules and imports
- **Control flow**: Conditionals (`if`, `switch`), loops (`for`, `while`), and blocks
- **Built-in functions**: Math operators, logical operators, and utility functions
- **Multiple interfaces**: CLI tool and web-based IDE

## Project Structure

The project is organized as a monorepo with the following packages:

### `eva-parser`
Parser for Eva language using BNF grammar. Generates AST from source code.

- **Location**: `packages/eva-parser/`
- **Technology**: `syntax-cli` with LALR1 parsing mode
- **Grammar**: Defined in `src/eva-grammar.bnf`

### `eva-core`
Core interpreter implementation. Contains the AST evaluator, environment management, and built-in functions.

- **Location**: `packages/eva-core/`
- **Main exports**: `Eva` class, `EvaHost` interface
- **Features**:
  - Variable declarations and assignments
  - Function definitions and lambda expressions
  - Class definitions with inheritance
  - Module system
  - Control flow statements
  - Built-in operators and functions

### `eva-cli`
Command-line interface for executing Eva programs.

- **Location**: `packages/eva-cli/`
- **Usage**:
  ```bash
  eva -e "(+ 1 2)"           # Evaluate expression
  eva -f path/to/file.eva    # Execute file
  ```

### `eva-web`
Web-based IDE for Eva programming language.

- **Location**: `packages/eva-web/`
- **Technology**: React, Vite, CodeMirror, xterm.js
- **Features**:
  - Code editor with syntax highlighting
  - Console output
  - Visualizer pane

## Installation

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Build specific package
npm run build:parser
npm run build:core
npm run build:cli
```

## Development

```bash
# Run web IDE
npm run dev

# Run tests
npm test

# Run tests for specific package
npm run test:parser
npm run test:core
npm run test:cli
npm run test:web
```

## Language Syntax

### Variables

```lisp
(var x 10)              ; Declare variable
(set x 20)              ; Assign variable
```

### Blocks

```lisp
(begin
  (var x 10)
  (var y 20)
  (+ x y)
)
```

### Conditionals

```lisp
(if (> x 0)
  "positive"
  "negative"
)

(switch x
  (case 1 "one")
  (case 2 "two")
  (default "other")
)
```

### Loops

```lisp
(while (> x 0)
  (set x (- x 1))
)

(for (var i 0) (< i 10) (inc i)
  (print i)
)
```

### Functions

```lisp
; Function definition
(def square (x) (* x x))

; Lambda function
(var square (lambda (x) (* x x)))

; Function call
(square 5)
```

### Classes

```lisp
(class Point null
  (begin
    (def constructor (this x y)
      (begin
        (set (prop this x) x)
        (set (prop this y) y)
      )
    )
    (def calc (this)
      (+ (prop this x) (prop this y))
    )
  )
)

(var p (new Point 10 20))
((prop p calc) p)  ; Returns 30
```

### Inheritance

```lisp
(class Point3D Point
  (begin
    (def constructor (this x y z)
      (begin
        ((prop (super Point3D) constructor) this x y)
        (set (prop this z) z)
      )
    )
  )
)
```

### Modules

```lisp
; Define module
(module Math
  (begin
    (def abs (value) (if (< value 0) (- value) value))
    (var MAX_VALUE 1000)
  )
)

; Use module
((prop Math abs) (- 10))  ; Returns 10
(prop Math MAX_VALUE)     ; Returns 1000
```

### Imports

```lisp
(import Math "Math.eva")
((prop Math abs) (- 10))
```

### Built-in Functions

- **Math operators**: `+`, `-`, `*`, `/`
- **Comparison**: `>`, `>=`, `<`, `<=`, `=`, `!=`
- **Logical**: `and`, `or`, `not`
- **Utilities**: `print`, `concat`

### Syntax Sugar

```lisp
(inc x)  ; Equivalent to (set x (+ x 1))
(dec x)  ; Equivalent to (set x (- x 1))
```

## Examples

### Simple Calculation

```lisp
(begin
  (var x 10)
  (var y 20)
  (+ x y)
)
; Returns: 30
```

### Function with Lambda

```lisp
(begin
  (def onClick (callback)
    (begin
      (var x 10)
      (var y 20)
      (callback (+ x y))
    )
  )
  (onClick (lambda (data) (* data 10)))
)
; Returns: 300
```

### Class with Inheritance

```lisp
(begin
  (class Point null
    (begin
      (def constructor (this x y)
        (begin
          (set (prop this x) x)
          (set (prop this y) y)
        )
      )
      (def calc (this)
        (+ (prop this x) (prop this y))
      )
    )
  )
  
  (class Point3D Point
    (begin
      (def constructor (this x y z)
        (begin
          ((prop (super Point3D) constructor) this x y)
          (set (prop this z) z)
        )
      )
      (def calc (this)
        (+ ((prop (super Point3D) calc) this)
          (prop this z)
        )
      )
    )
  )
  
  (var p (new Point3D 10 20 30))
  ((prop p calc) p)
)
; Returns: 60
```

## Testing

The project includes comprehensive test suites for each package:

- **Parser tests**: Grammar validation and tokenization
- **Core tests**: Language features, built-in functions, OOP, modules
- **CLI tests**: File execution and import handling
- **Web tests**: Component testing

Run tests with:

```bash
npm test
```

## Architecture

### Evaluation Flow

1. **Parsing**: Source code → AST (via `eva-parser`)
2. **Transformation**: AST transformations for syntax sugar (e.g., `switch` → `if`, `for` → `while`)
3. **Evaluation**: AST → Values (via `eva-core`)
4. **Environment**: Scoped variable and function storage

### Environment Model

- **Global environment**: Built-in functions and operators
- **Module environments**: Module-scoped variables and functions
- **Class environments**: Class definitions and methods
- **Instance environments**: Object instances with properties
- **Activation records**: Function call scopes

## License

ISC

## Version

0.1.0
