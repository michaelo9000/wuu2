import React, { useState, useEffect } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import { createUser, signInUser } from '../firebase-files/firebase';
import useInput from '../components/Input';
import { styles } from '../styles';

export default function Gate(props) {
  const [email, emailInput] = useInput({ humanName: 'email' });
  const [password, passwordInput] = useInput({ humanName: 'password' });
  const [isSignIn, setIsSignIn] = useState([]);

  const submit = async function () {

    let userFunction = isSignIn ? handleSignInUser : handleCreateUser;
    let result = await userFunction();

    if (result.isSuccess) {
      props.handleSignIn(result);
    }
    else {
      props.handleError(result.error);
    }
  }

  const handleCreateUser = async function () {
    return await createUser({ email: email.toLowerCase().trim(), password: password.trim() }, props.listenersCallback);
  }

  const handleSignInUser = async function () {
    return await signInUser({ email: email.toLowerCase().trim(), password: password.trim() }, props.listenersCallback);
  }

  return (
    <View style={styles.page}>
      {emailInput}
      {passwordInput}
      {/* todo make button component so i can style them all the same */}
      {/* buttons need to be contained to be sized?? */}
      <View style={styles.input} >
        <Button color={styles.buttonColor} onPress={submit} title={isSignIn ? 'sign in' : 'create account'} />
        <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
          <Text style={styles.lookALink}>{isSignIn ? 'create account' : 'sign in'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}