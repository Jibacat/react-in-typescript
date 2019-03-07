
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ComponentDemo from './components/stateful-component-demo';
import RenderCallbackDemo from './components/render-callback-component';
import ComponentInject from './components/component-inject';
import Generics from './components/generics-component-demo';
import HOCDemo from './components/hoc-demo';

const Home: React.SFC = () => {
    return (
        <div>
            <h1>1. Stateful Component & Stateless Component</h1>
            <ComponentDemo />
            <h1>2. RenderCall Component</h1>
            <RenderCallbackDemo title="First Menu">content</RenderCallbackDemo>
            <h1>3. Injected Component</h1>
            <ComponentInject title="Second Menu">content2</ComponentInject>
            <h1>4. Generics Component</h1>
            <Generics />
            <h1>5. HOC</h1>
            <HOCDemo />
        </div>
    );
};

ReactDOM.render(
    <Home />,
    document.getElementById('root') as HTMLElement,
);
