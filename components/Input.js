import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from '../styles';

export default function useInput(props) {
    const [stateValue, setValue] = useState('');

    const getKeyboardType = function () {
        switch (props.humanName) {
            case "email": return "email-address";
            default: return "default";
        }
    }

    let displayValue = stateValue;

    if (!stateValue && stateValue !== '')
        displayValue = props.value;

    const input = <TextInput
        style={{ ...props.style, ...styles.textInput }}
        placeholder={props.humanName}
        onChangeText={newValue => setValue(newValue)}
        value={displayValue || ""}
        editable={!props.disabled}
        autoComplete={props.humanName}
        secureTextEntry={props.humanName == "password"}
        keyboardType={getKeyboardType()}
    />;

    return [stateValue, input];
}