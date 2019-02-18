import * as React from 'react';

interface IHelloWorldState {
    show: boolean;
}

class ComponentDemo extends React.Component<{}, IHelloWorldState> {
    public content = 'hello world!';

    public state = {
        show: true,
    };

    public render() {
        const { show } = this.state;
        return <div style={{ display: show ? 'block' : 'none' }}>{this.content}</div>;
    }
}

export default ComponentDemo;
