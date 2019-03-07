// render callback component
/*
    Function as Child Components &  Render Callbacks
    渲染回调有两种方法：
    1. 通过props将函数传给功能组件
    2. 通过children将函数传给功能组件
*/

import * as React from 'react';
import { isFunction } from '../utils';

const initialState = {
    show: false,
};

type State = Readonly<typeof initialState>;

type Props = Partial<{
    children: RenderCallback;
    myRender: RenderCallback;
}>;

type RProps = {
    title: string;
    children: React.ReactNode
};

type RenderCallback = (args: ToggleableComponentProps) => JSX.Element;

type ToggleableComponentProps = {
    show: State['show'];
    toggle: Toggleable['toggle'];
};

class Toggleable extends React.Component<Props, State> {
    readonly state: State = initialState;

    updateShowState = (prevState: State) => { return { show: !prevState.show }; };

    private toggle = () => { return this.setState(this.updateShowState); };

    render() {
        const { myRender, children } = this.props;
        const { show } = this.state;
        const renderProps = {
            show,
            toggle: this.toggle,
        };

        if (myRender) {
            return myRender(renderProps);
        }

        return isFunction(children) ? children(renderProps) : null;
    }
}

const RenderCallbackDemo: React.SFC<RProps> = ({ title, children }) => {
    return (
        <Toggleable
            myRender={({ show, toggle }) => {
                return (
                    <div>
                        <div onClick={toggle}>
                            <div>{title}</div>
                        </div>
                        {show ? children : null}
                    </div>
                );
            }}
        />
    );
};

export default RenderCallbackDemo;
