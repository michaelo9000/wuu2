import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from '../styles';

export default function useInput(props) {
    const [stateValue, setValue] = useState('');

    const getAutoComplete = function () {
        if (props.humanName == "email")
            return "email";
    }

    let displayValue = stateValue;

    if (!stateValue && stateValue !== '')
        displayValue = props.value;

    const input = <TextInput
        style={{ ...props.style, ...styles.input }}
        placeholder={props.humanName}
        onChangeText={newValue => setValue(newValue)}
        value={displayValue || ""}
        editable={!props.disabled}
        autoComplete={props.humanName}
    />;

    return [stateValue, input];
}