// stateful component
import * as React from 'react';
import SFCDemo from './stateless-component-demo';

const initialState = {
    show: true,
};

type State = Readonly<typeof initialState>

class StatefulComponentDemo extends React.Component {
    readonly state: State = initialState;

    public content = 'hello world!';

    textInput: HTMLInputElement | null = null;

    setTextInputRef = (element: HTMLInputElement) => {
        this.textInput = element;
    };

    focusTextInput = () => {
        // Focus the text input using the raw DOM API
        if (this.textInput) this.textInput.focus();
    };

    // constructor(props: {}) {
    //     super(props);
    //     this.state = initialState;
    // }

    public toggleDisplay = () => {
        const { show } = this.state;
        // this.state.show = !show;  // Cannot assign to 'show' because it is a read-only property.
        // this.state = { show: !show }; // Cannot assign to 'state' because it is a read-only property.
        this.setState({
            show: !show,
        });
    }

    public render() {
        const { show } = this.state;
        return (
            <div>
                <input type="text" ref={this.setTextInputRef} />
                <div style={{ display: show ? 'block' : 'none' }}>{this.content}</div>
                <SFCDemo buttonValue="toggle display" handleClick={this.toggleDisplay} />
            </div>
        );
    }
}

export default StatefulComponentDemo;
