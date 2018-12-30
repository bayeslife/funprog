const input = 'index.js'
const sourcemap = true

export default [{
    input,
    output: {
        file: 'dist/funprog.mjs',
        format: 'es',
        sourcemap
    }
}, {
    input,
    output: {
        file: 'dist/funprog.js',
        format: 'cjs',
        sourcemap
    }
},
{
    input,
    output: {
        file: 'dist/funprog.umd.js',
        format: 'umd',
        name: 'funprog',
        sourcemap
    }
}]
