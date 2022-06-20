import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { createUser, signInUser } from './firebase-files/firebase';
import useInput from './components/Input';
import { styles } from './styles';

export default function Gate(props) {
  const [email, emailInput] = useInput({ humanName: 'email' });
  const [password, passwordInput] = useInput({ humanName: 'password' });

  const submit = async function () {

    let userFunction = props.isSignIn ? handleSignInUser : handleCreateUser;
    let result = await userFunction();

    if (result.isSuccess) {
      props.handleSignIn(result);
    }
    else {
      props.handleError(result.error);
    }
  }

  const handleCreateUser = async function () {
    return await createUser({ email: email, password: password }, props.listenersCallback);
  }

  const handleSignInUser = async function () {
    return await signInUser({ email: email, password: password }, props.listenersCallback);
  }

  return (
    <View style={styles.page}>
      {emailInput}
      {passwordInput}
      {/* todo make button component so i can style them all the same */}
      {/* buttons need to be contained to be sized?? */}
      <View style={styles.input} >
        <Button onPress={submit} title={props.isSignIn ? 'sign in' : 'create account'} />
      </View>
    </View>
  );
}