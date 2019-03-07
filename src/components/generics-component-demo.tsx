import * as React from 'react';

interface JsxClass<P> extends React.Component<P> {
    render(): React.ReactNode
}

interface ReactCtor<P> {
    new(props: P): JsxClass<P>;
}

interface Props<T> {
    title: T
}

const initialState = {
    content: 'content detail',
}; // 组件必须指定defaultState的值，state的值只受组件内部自己控制，所以State使用泛型无意义，而props可以使用，因为它的值是从父组件传递来的。

type State = Readonly<typeof initialState>

class C<T> extends React.Component<Props<T>, State> {
    readonly state: State = initialState;

    render(): React.ReactElement<any> {
        const { title } = this.props;
        const { content } = this.state;
        return (
            <div>
                <div>
                    tittle:
                    {title}
                    <div>
                        type of title:
                        {typeof title}
                    </div>
                </div>
                <div>
                    content:
                    {content}
                </div>
            </div>
        );
    }
}
// C1 C2都是generics component
const C1: ReactCtor<Props<number>> = C;
const C2: ReactCtor<Props<string>> = C;

const Com: React.SFC = () => {
    return (
        <div>
            <C1 title={123} />
            <C2 title="123" />
        </div>
    );
};
export default Com;
