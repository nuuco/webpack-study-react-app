# My Agora States

## 📌 Webpack 을 적용해보자 - 리액트

### 🧩 리액트 개발에 꼭 필요한 라이브러리

1. **react, react-dom**
    - react : 리액트 컴포넌트와 Hooks, 라이프 사이클에 대한 정보가 모두 들어있는 기본 리액트 라이브러리
    - react-dom : 리액트 코드를 브라우저에 보여줄 수 있게 하는 라이브러리
2. **babel**   
    JSX 를 브라우저가 읽을 수 있는 js 로 변경해서 번들링해준다. babel은 JSX를 JavaScript로 변경하여 entry에서 불러올 수 있게 만들어줬기 때문에 로더의 일종으로 볼 수 있다.
    
3. **css-loader**   
    `import 'style.css';` 와 같이 입력해도 css 가 적용이 된 것도 css-loader 덕분!
    
<br/>

### 🧩 리액트 개발에 도움이 되는 라이브러리

1. react-hot-loader → (최신) **react-refresh-webpack-plugin**   
    [react-refresh-webpack-plugin 깃헙](https://github.com/pmmmwh/react-refresh-webpack-plugin)   
    webpack-dev-server처럼 저장할 때 마다 변경사항을 개발 환경에 적용해주는 라이브러리. 추가적으로 리액트 상태를 유지시켜준다.
    
2. **eslint**   
    JavaScript로 개발 시 자주 접하는 에러를 방지하기 위한 린터
    
3. **prettier**    
    JavaScript로 개발 시 통일성 있게 코드 형식을 맞출 수 있게 도와주는 툴. eslint와 조합해서 통일된 코드 형식까지 강요할 수도 있다.
        
<br/>

### 🧩 create-react-app 없이 리액트를 웹팩으로 빌드하기

👉 이걸 해보면 npm run start 가 생각보다 되게 복잡한 일이었다는 것을 알게 된다.

1. **package.json 만들기**
    - 우선 다음 명령어로 기본 설정된 package.json 파일을 만들어준다.   
       
    ```bash
    $ npm init -y
    ```
            
<br/>

2. **리액트 개발에 꼭 필요한 두 라이브러리 설치**
    
    ```bash
    $ npm install react react-dom
    ```
           
<br/>

3. **webpack 설치하기**
    - 웹팩을 사용하려면 webpack 과 webpack-cli 를 설치해야 한다.
        
        ※ 개발 환경에서만 필요한 모듈이므로 -D (또는 —save-dev) 로 설치
        
    
    ```bash
    $ npm install -D webpack webpack-cli
    ```
             
<br/>
  
4. **webpack 스크립트 세팅**
    - `npx webpack` 명령어로 웹팩을 실행시킬 수 있다. 이러면 entry 파일에서부터 시작해 번들링한 결과를 output 에 지정한 파일로 만들어 준다.
    - 다른 개발자와 협업에 용이하도록 스트립트를 만들어 주는 게 좋다.
    
    ```json
    //package.json
    "scripts": {
    		"build": "webpack", // here
        "test": "echo \"Error: no test specified\" && exit 1"
      },
    ```
             
<br/>
  
5. **babel 설치하기 & babel 설정 파일 세팅**
    - 리액트 앱에서 웹팩 빌드에 babel 을 사용하기 위해서는 기본 4개의 다음 라이브러리를 설치해야한다.
        
        ```bash
        $ npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
        ```
        
        - @babel/core : 기본 babel. JS 최신 문법을 이전 버전 문법으로 바꿔서 호환되게 해준다.
        - @babel/preset-env : 각 환경에 맞게 알아서 babel 설정을 해준다.
        - @babel/preset-react : jsx 파일을 js 파일로 컴파일 해준다.
        - babel-loader : 바벨과 웹팩을 연결해주는 역할.
    - 프로젝트 최상위 디렉터리에 바벨 설정 파일(`babel.config.js` 또는 `.babelrc`) 을 만들고 presets 설정을 한다.
        
        ```jsx
        //babel.config.js
        module.exports = {
          presets: [
            ["@babel/preset-env"],
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        };
        
        // 또는 .babelrc
        {
            "presets": [
              ["@babel/preset-env"],
              ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
        ```
        
              
<br/>
 
6. **webpack.config.js 파일 만들기**
    - 웹팩 설정 파일을 만들어준다. 번들 파일을 만들기 위해서는 기본적으로 entry, output 두 속성이 필요하다.
        - entry : 번들링 시작 파일 위치
        - output : 번들링 결과물
    - babel 을 적용시키기 위해 babel-loader 도 적용해준다.
        
        ```jsx
        //webpack.config.js
        const path = require('path');
        
        module.exports = {
          entry: './src/index.js',
          output: {
            path: path.resolve(__dirname, 'dist'), // './dist'의 절대 경로를 리턴
            filename: 'app.bundle.js',
          },
        	module: {
        	  rules: [
        	    {
        	      test: /\.js$/,
        	      loader: 'babel-loader',
        	      exclude: /node_modules/
        	    }
        	  ]
        	}
        };
        ```
        
    - css 파일이 있다면 관련 로더도 설정해준다.
        
        ```bash
        $ npm install -D css-loader style-loader
        ```
        
        ```jsx
        const path = require('path')
        
        module.exports = {
          entry: './src/index.js',
          output: {
            path: path.join(__dirname, 'dist'),
            filename: 'app.bundle.js'
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
              },
        			{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
              }
            ]
          }
        }
        ```
               
<br/>    
    
7. **플러그인(plugin) 사용하기**   
    - 플러그인을 사용해서 다양한 작업을 편리하게 할 수 있다.
    - 💻 웹팩은 기본적으로 js 파일하나만 번들 파일로 만들기에 html 문서는 번들 폴더에 따로 생성해줘야했다. 하지만 `html-webpack-plugin` 을 사용하면 html 도 번들 폴더에 자동 생성해준다.
        1. 플러그인 설치
            
            ```bash
            $ npm i -D html-webpack-plugin
            ```
            
        2. webpack 설정 파일에 플러그인을 불러오고, plugins 속성에 다음과 같이 추가한다.
            
            ```jsx
            const path = require('path');
            //설치한 플러그인은 반드시 불러와야한다.
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            
            module.exports = {
              ...
              plugins: [new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html")
            		//번들 폴더에 생성해준 기존 html 문서 위치
              })]
            };
            ```
            
        3. 웹팩을 실행하면 번들 폴더에 html 문서가 생기고 자동으로 번들링된 js 문서가 script 태그로 들어가 있다.
           
<br/>

## 📌 Webpack 을 적용해보자 - advanced

1. **작동 모드 설정 - 개발 환경과 배포 환경 나눠보기**
    - 원활한 웹팩 설정 파일을 구성하기 위해 webpack-merge를 설치
        
        ```bash
        $ npm install -D webpack-merge
        ```
        
    - 보통 설정 파일을 3가지로 나누는 편이다.
        - webpack.config.base.js  : 기본 설정 파일
        - webpack.config.dev.js : 개발 모드 설정 파일
        - webpack.config.prod.js : 배포 모드 설정 파일
           
             
        ```jsx
        // webpack.config.base.js
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        
        module.exports = {
          entry: './src/index.js',
          output: {
            path: path.join(__dirname, 'dist'),
            filename: 'app.bundle.js'
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
              },
              {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/
              }
            ]
          },
          plugins: [new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
          }), new MiniCssExtractPlugin()],
        }
        ```
        
        ```jsx
        // webpack.config.dev.js
        const { merge } = require("webpack-merge");
        const baseConfig = require("./webpack.config.base");
        
        module.exports = merge(baseConfig, {
          mode: "development",
          devServer: {
            port: 3001,
          },
        });
        ```
        
        ```jsx
        // webpack.config.prod.js
        const { merge } = require("webpack-merge");
        const baseConfig = require("./webpack.config.base");
        const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
        
        module.exports = merge(baseConfig, {
          mode: "production",
          optimization: {
        		// '...'가 없으면 기본 옵션을 덮어씌워버리기 때문에 
        		// app.bundle.js 는 경량화 되지 않는다.
            minimizer: [new CssMinimizerPlugin(), '...'],
          },
        });
        ```
        
    - package.json 에 스크립트를 수정한다.
        
        ```bash
        "scripts": {
            "dev": "webpack --config webpack.config.dev.js",
            "build": "webpack --config webpack.config.prod.js"
          },
        ```
        
             
<br/>
  
2. **Output 관리 - output 파일명 동적으로 변경**
    - [fullhash] 또는 [name]/[chunkhash]/[contenthash] 를 파일명으로 주면 output이 동적으로 변한다.   
        [웹팩 공식 문서 참고](https://webpack.kr/guides/build-performance/#avoid-production-specific-tooling)
        
    - 예를 들어 이렇게 작성하면
        
        ```jsx
        // webpack.config.js
        module.exports = {
          entry: './src/index.js',
          output: {
            path: path.join(__dirname, 'dist'),
            filename: '[fullhash].bundle.js',
            clean: true,
          },
        ```
        
    - 이런 번들 파일이 생성된다.    
    `33cccb049b8b5551c62d.bundle.js`
        
    - 번들 파일에 변경사항이 생기면 이 해시값이 달라진다. (변경 사항이 없으면 해시값은 그대로다!)
              
<br/>
 
3. **Asset 관리 - CSS 파일 따로 추출하기**
    - css 파일을 따로 추출하고 싶다면 + 그리고 그 css 파일을 최적화하고 싶다면
        
        ⇒ [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin), [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin) 플러그인을 사용한다.
    
        
        1. 플러그인 설치
            
            ```bash
            $ npm i -D mini-css-extract-plugin css-minimizer-webpack-plugin
            ```
            
        2. webpack 설정 파일에 플러그인을 불러오고, plugins 속성에 다음과 같이 추가한다.
            
            ```jsx
            //설치한 플러그인은 반드시 불러와야한다.
            const MiniCssExtractPlugin = require("mini-css-extract-plugin");
            const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
            
            module.exports = {
              module: {
                rules: [
                  {
                    test: /.s?css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            				//style-loader 와 MiniCssExtractPlugin.loader는 같이 쓰일 수 없다.
                  },
                ],
              },
              optimization: {
                minimizer: [
            			//이 설정을 해줘야 production 모드 시, css 파일도 최적화(한줄로 축약) 된다.
                  new CssMinimizerPlugin(),
                ],
              },
              plugins: [new MiniCssExtractPlugin()],
            };
            ```
            
        3. 번들 폴더에 css 파일이 생긴다. optimizaion 설정을 해줬으므로 production 모드 시, css 파일도 최적화(한줄로 축약) 된다.

             
<br/>          
    
4. **개발용 서버**   
    1. **webpack-dev-server**
        - webpack-dev-server 는 라이브 서버와 비슷한 기능을 한다.
            
            ⇒ 데브서버를 키고, (번들 파일이 아닌) 기존 파일을 수정 & 저장하면 페이지에 변경사항이 반영되어있다! (단 번들링 파일이 수정되는 건 아니다… 따로 웹팩 실행시켜야 파일이 바뀐다.)
            
        - webpack-dev-server 설치
            
            ```bash
            $ npm i webpack-dev-server
            ```
            
        - 웹팩 설정 파일에 다음을 추가한다.
            
            ```jsx
            module.exports = {
            	...
              devServer: {
                port: 3001,  //3001 포트로 실행하겠다는 뜻
              }
            };
            ```
            
        - `npx webpack serve` 명령어로 데브서버를 실행한다. 협업을 위해 스크립트를 추가하는 것이 좋다.
            
            ```jsx
            "scripts": {
                "start": "webpack serve"
              }
            
            //모드따라 설정 파일을 분기해줬다면 이렇게
            "scripts": {
                "start": "webpack serve --config webpack.config.dev.js",
                "dev": "webpack --config webpack.config.dev.js",  //번들링만
                "build": "webpack --config webpack.config.prod.js" //번들링만
              }
            ```
            
        - localhost:3001 로 접속하면 페이지가 뜬다.   
    1. 🔥 react-hot-loader → (최신) **react-refresh-webpack-plugin**
        - webpack-dev-serve 처럼 수정시 바로 켜져있는 페이지에 적용된다.
        - webpack-dev-server 를 사용하는 상태로 사용
        - 플러그인 설치
            
            ```bash
            $ npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
            ```
            
        - 웹팩 설정 파일에 적용 → hot: true 설정 & 플러그인 적용
            
            ```jsx
            // webpack.config.dev.js
            const { merge } = require("webpack-merge");
            const baseConfig = require("./webpack.config.base");
            const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
            
            module.exports = merge(baseConfig, {
              mode: "development",
              devServer: {
                port: 3001,
                hot: true,
              },
              plugins: [new ReactRefreshPlugin()]
            });
            ```