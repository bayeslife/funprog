import resolve    from 'rollup-plugin-node-resolve';
import commonjs   from 'rollup-plugin-commonjs';
import pkg        from './package.json';

const { version, author, name, main, license, description } = pkg;

const banner = `\
/**
 * ${name} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

// var jsonconfig={
//   // All JSON files will be parsed by default,
//   // but you can also specifically include/exclude files
//   include: 'src/**',
//   exclude: [ ],

//   // for tree-shaking, properties will be declared as
//   // variables, using either `var` or `const`
//   preferConst: true, // Default: false

//   // specify indentation for the generated default export —
//   // defaults to '\t'
//   indent: '  '
// }

export default [
  {
    input: 'index.js',
    output: {
      file: "dist/lib.umd.js",
      name: "funprog",
      sourcemap: true,
      format: 'umd',
      banner
    },
    plugins: [
      resolve(),  // so Rollup can find external libs
      commonjs(), // so Rollup can convert commonJS to an ES module
    ]
  },
  // {
  //   input: 'index.js',
  //   output: {
  //     file: "dist/lib.esm.js",
  //     name: 'lib',
  //     sourcemap: true,
  //     format: 'esm',
  //     banner
  //   },
  //   plugins: [
  //     resolve(),
  //     //commonjs(),
  //     //json(jsonconfig)
  //   ]
  // }
]
