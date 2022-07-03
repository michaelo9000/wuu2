import React, { useState, useEffect } from 'react';
import { Text, View, Image, useWindowDimensions } from 'react-native';

import { getEqualTo, signInUser } from './firebase-files/firebase';
import firebaseArrayConvert from './firebase-files/firebaseArrayConvert';
import { retrieveUserCredentials, storeUserCredentials } from './crypto';

import { styles } from './styles';
import Gate from './pages/gate';
import Mates from './pages/mates';
import Take from './pages/take';
import See from './pages/view';
import Nav from './components/nav';

export default function App() {
  const [authUser, setAuthUser] = useState({});
  const [userLoaded, setUserLoaded] = useState();
  const [signingIn, setSigningIn] = useState();
  const [mates, setMates] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [requestTaking, setTakingRequest] = useState();
  const [requestViewing, setViewingRequest] = useState();
  const [page, setPage] = useState('mates');

  useEffect(() => {
    (async () => {
      if (!authUser.userId) {
        let userCreds = await retrieveUserCredentials();
        if (userCreds.email) {
          setSigningIn(true);
          let result = await signInUser({ email: userCreds.email.toLowerCase().trim(), password: userCreds.password.trim() }, listenersHandler);
          if (result.isSuccess) {
            handleSignIn(result);
          }
          else {
            handleError(result.error);
          }
          setSigningIn(false);
        }
      }
    })();
  }, []);

  const handleSignOut = function () {

  }

  const handleSignIn = async function (userData) {
    let { data, ...userProfile } = userData;
    console.log(userData);
    storeUserCredentials(userData);
    setAuthUser(userProfile);
    setMates(data.mates);
    setSentRequests(data.sentRequests);
    setReceivedRequests(data.receivedRequests);
    setUserLoaded(true);
  }

  const listenersHandler = async function (table, snapshot, userId) {
    let entry = snapshot.val();
    switch (table) {
      case "mates":
        let mate = (await getEqualTo('userDetails', 'userId', entry.mateId)).val();
        setMates(s => ({ ...s, [Object.keys(mate)[0]]: mate[Object.keys(mate)[0]] }));
        break;
      case "requests":
        if (entry.userId == userId) {
          setSentRequests(s => ({ ...s, [snapshot.key]: entry }));
        }
        else
          setReceivedRequests(s => ({ ...s, [snapshot.key]: entry }));
        break;
      default: break;
    }
  }

  const takePhotos = function (request) {
    setTakingRequest(request);
    setPage('take');
  }

  const viewPhotos = function (request) {
    setViewingRequest(request);
    setPage('view');
  }

  return <View style={styles.app}>
    {!authUser.userId &&
      (signingIn ?
        <Text>signing in...</Text>
        :
        <Gate handleError={e => alert(e)} handleSignIn={handleSignIn} listenersCallback={listenersHandler} />
      )
    }
    {userLoaded &&
      <View style={styles.app}>
        <Nav setPage={setPage} />
        {page == 'mates' &&
          <Mates
            user={authUser}
            mates={firebaseArrayConvert(mates)}
            sentRequests={firebaseArrayConvert(sentRequests)}
            receivedRequests={firebaseArrayConvert(receivedRequests)}
            takePhotos={takePhotos}
            viewPhotos={viewPhotos}
          />
        }
        {page == 'take' &&
          <Take request={requestTaking} user={authUser} setPage={setPage} />
        }
        {page == 'view' &&
          <See req={requestViewing} />
        }
      </View>
    }
  </View>
}