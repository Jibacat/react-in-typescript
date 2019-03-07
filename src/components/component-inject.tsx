// component inject

import * as React from 'react';
import { isFunction } from '../utils';

// 1. Finish a Base component

const initialState = { show: false };
const defaultProps = { data: {} as { [name: string]: any } }; //  TODO: We have no idea about the feature of defaultProps. It will be defined by generics probably.
type State = Readonly<typeof initialState>;
type Props = Partial<
    {
        children: RenderCallback | React.ReactNode;
        render: RenderCallback;
        component: React.ComponentType<ToggleableComponentProps<any>>;
    } & DefaultProps
>;

type DefaultProps = typeof defaultProps;
type RenderCallback = (args: ToggleableComponentProps) => JSX.Element;

type ToggleableComponentProps<P extends object = object> = {
    show: State['show'];
    toggle: Toggleable['toggle'];
} & P;

class Toggleable extends React.Component<Props, State> {
    static readonly defaultProps: Props = defaultProps;

    readonly state: State = initialState;

    updateShowState = (prevState: State) => { return { show: !prevState.show }; };

    private toggle = () => { return this.setState(this.updateShowState); };

    render() {
        const {
            component: InjectedComponent,
            data,
            render,
            children,
        } = this.props;
        const { show } = this.state;
        const renderProps = {
            show,
            toggle: this.toggle,
        };
        // 当 component 属性被使用时，children 是 ReactNode 而不是函数
        if (InjectedComponent) {
            return (
                <InjectedComponent {...data} {...renderProps}>
                    {children}
                </InjectedComponent>
            );
        }

        if (render) {
            return render(renderProps);
        }

        return isFunction(children) ? children(renderProps) : null;
    }
}

//  2. Transform [Render-callbacks] or [Children] into a component
type MenuItemProps = { title: string };

const MenuItem: React.SFC<MenuItemProps & ToggleableComponentProps> = ({
    title,
    toggle,
    show,
    children,
}) => {
    return (
        <div>
            <div onClick={toggle}>
                <div>{title}</div>
            </div>
            {show ? children : null}
        </div>
    );
};

// 3. Inject MenuItem into Toggleable
type ToggleableMenuProps = { title: string; children: React.ReactNode }

const ToggleableMenuViaComponentInjection: React.SFC<ToggleableMenuProps> = ({
    title,
    children,
}) => {
    return (
        <Toggleable component={MenuItem} data={{ title }}>
            {children}
        </Toggleable>
    );
};

export default ToggleableMenuViaComponentInjection;
