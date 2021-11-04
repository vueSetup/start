## [@babel/parser](https://babeljs.io/docs/en/babel-parser)
> The Babel Parser (previously Babylon) is a JavaScript parser used in Babel.


```typescript
import { parse } from '@babel/parser'

const ast = parse(`const square = (n: number) => n * n`, { plugins: ['typescript'] })
```

## [@babel/traverse](https://babeljs.io/docs/en/babel-traverse)
> The Babel Traverse module maintains the overall tree state, and is responsible for replacing, removing, and adding nodes


```shell
yarn add -D @types/babel__traverse
```
```typescript
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

const code = `const square = (n: number) => n * n`

const ast = parse(code, { plugins: ['typescript'] })

traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: 'n' })) {
            path.node.name = 'x'
        }
    }
})
```

## [@babel/generator](https://babeljs.io/docs/en/babel-generator)
> The Babel Generator turns an AST into code, maintaining sourcemaps, user preferences, and valid output.

```shell
yarn add -D @types/babel__generator
```
```typescript
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'

const code = `const square = (n: number) => n * n`

const ast = parse(code, { plugins: ['typescript'] })

traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: 'n' })) {
            path.node.name = 'x'
        }
    }
})

const result = generator(ast, { /* options */ }, code)

console.log(result.code)
```

## [@babel/types](https://babeljs.io/docs/en/babel-types)
> The Babel Types module contains methods for building ASTs manually and for checking the types of AST nodes.

## [@babel/template](https://babeljs.io/docs/en/babel-template)
> The Babel Template is known as an implementation of quasiquotes.
