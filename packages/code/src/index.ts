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

export default result