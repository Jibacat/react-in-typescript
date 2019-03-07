
import * as React from 'react';

type HOC<P> = (Component: React.ComponentType<any>, Props: P) => React.ComponentClass;

const InjectProps: HOC<WrappedProps> = (WrappedComponent, Props) => {
    return class extends React.Component {
        timer: number = 0;

        componentDidMount() {
            this.setTimer();
        }

        componentWillUnmount() {
            this.timer && clearInterval(this.timer);
        }

        setTimer = () => {
            this.timer = setInterval(() => {
                // do something
            }, 5000);
        }

        render() {
            return <WrappedComponent {...Props} />;
        }
    };
};

type WrappedProps = {
    color: string;
    count: number;
}

class WrappedComponent extends React.Component<WrappedProps> {
    render() {
        const { count, color } = this.props;
        return (
            <div style={{ color }}>
                Count is:
                {count}
            </div>
        );
    }
}

// class OtherWrappedComponent extends React.Component<WrappedProps> {
//     render() {
//         const { count, color } = this.props;
//         return (
//             <div>
//                 Count is:
//                 <div style={{ color }}>{count}</div>
//             </div>
//         );
//     }
// }

export default InjectProps(WrappedComponent, { color: 'red', count: 100 });
