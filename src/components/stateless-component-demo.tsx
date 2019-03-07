// stateless component

import * as React from 'react';

type Props = {
    handleClick(e: React.MouseEvent<HTMLButtonElement>): void;
    buttonValue?: string;
};

interface IHandleChange {
    (e: React.ChangeEvent<HTMLButtonElement>) : void;
}

const SFCDemo: React.SFC<Props> = ({ handleClick, buttonValue }) => {
    const handleChange: IHandleChange = (e) => {
        return e.target.value;
    };
    return (
        <div>
            <button type="submit" onClick={handleClick}>{buttonValue!}</button>
            <input type="text" onChange={handleChange} />
        </div>
    );
};

export default SFCDemo;
