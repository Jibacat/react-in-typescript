# react-in-typescript
Bulid a React project with webpack, typescript and eslint from null.  

### 1. Init npm in project

Firstly, We should install `node` in global environment. And then type `npm init` command to init the npm in an empty diretory. After finished that, a `package.json` file will be generated in the root path of directory.

### 2. Add React packages

To develop a react project, we need install the basic react library. Type `npm i -S react react-dom` command and then finish the installation in few seconds.

### 3. Add Typescript packages

Then we should install typescript packages. Type `npm i -D typescript @types/react @types/react-dom` command to get it.

To support `typescript` and `tsc`, we need configuration file. Type `touch tsconfig.json` command to create it and filled with the character below.

```
<!-- tsconfig.json -->
{
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "sourceMap": true,
        "outDir": "./dist/",
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ],
    "exclude": [
        "node_modules",
    ]
}
```

### 4. Init workspace

Type `mkdir src` to create src directory to store the main code. 

And then type `touch index.html` to create the root html. We should add root element and give it a id attribute. This file can alse store global variabile and script. Type`touch index.css` to save global style.

### 5. Init webpack 

Webpack can help us to bundle our code. Type `npm i -D webpack webpack-cli` command to install webpack. Webpack can only bundle `.js` file. So We need to install `ts-loader`, typing `npm i -D ts-loader` command to get it. It can help us bundling `.ts` and `.tsx` files.

Type `npm i -D source-map-loader` command to add source map in our project that can certain the location of log in terminal. 

We should install `npm i -D webpack-dev-server` to help us establish hot-loader rather than refresh the website.

Then we should give some configurations to webpack, type `touch webpack.config.js` command to create configurations file. In addition, `plugins: []` is necessay because `HotModuleReplacementPlugin` will be added to it.

```
<!-- webpack.config.js -->
module.exports = {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
  
    devtool: "source-map",
  
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
  
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },

    plugins: []
};
```

We also need configuration to support hot-loader, typing `touch webpack.dev.config.js` command to create develop configuration file. And fill in it with the characters below.

```
<!-- webpack.dev.config.js -->
const webpack = require('webpack');
const config = require('./webpack.common.config');
config.devServer = {
  hot: true,
  publicPath: '/dist/'
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;
```

### 6. Run project 

Add start command to `package.json`.
```
"scripts": {
    ...
    "start": "webpack-dev-server --config webpack.dev.config.js --mode=development"
  },
```
Then finish `index.tsx`, `components/components-demo.tsx` in `./src`.

Type `npm run start` in your terminal. And you can see the webpakck bundling process and then finished successfully in few seconds. Now we can visit `localhost:8080` to get the content in `component-demo.tsx`.


### 7. Add eslint 

Type `npm i -D eslint` to install eslint. And We choose to follow the Airbnb Rule because of strict. We need type `npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-typescript typescript-eslint-parser` command to strength eslint.

After we finish installation, we should add configuration to support the eslint. Type `touch .eslintrc.json` command to create and fill with characters below.

```
<!-- eslintrc.json -->
{
    "extends": "airbnb",
    "parser": "typescript-eslint-parser",
    "env": {
      "browser": true
    },
    "rules": {
      "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
      "react/jsx-indent": ["error", 4],
      "global-require": "off",
      "indent": ["error", 4],
      "no-unused-expressions": 0,           
      "class-methods-use-this": 0,           
      "no-underscore-dangle": 0,            
      "arrow-body-style": ["error", "always"], 
      "max-len": ["error", 200],
      "react/jsx-indent-props": ["error", 4],
      "react/require-default-props": 0,     
      "react/no-array-index-key ": 0,        
      "react/jsx-boolean-value": ["error", "always"],
      "react/forbid-prop-types": 0,
      "react/prop-types": 0,
      "import/no-extraneous-dependencies": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/img-redundant-alt": 0,
      "jsx-a11y/interactive-supports-focus": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "jsx-a11y/mouse-events-have-key-events": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/anchor-has-content": 0
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"],
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
}  
```

We need add `eslint` command to `package.json` for checking the specified files.

```
<!-- package.json -->
"scripts": {
  ...
  "eslint": "eslint src --ext .ts,.tsx"
},
```
Then we can type `npm run eslint` to check the code.




