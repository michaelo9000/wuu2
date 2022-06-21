import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { getEqualTo, signOut as firebaseSignOut } from './firebase-files/firebase';
import firebaseArrayConvert from './firebase-files/firebaseArrayConvert';
import { styles } from './styles';
import Take from './pages/take';
import Gate from './pages/gate';
import Mates from './pages/mates';
import Requests from './pages/requests';
import Nav from './components/nav';

export default function App() {
  const [authUser, setAuthUser] = useState({});
  const [userLoaded, setUserLoaded] = useState();
  const [mates, setMates] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [requestTaking, setTakingRequest] = useState();
  const [requestViewing, setViewingRequest] = useState();
  const [page, setPage] = useState('mates');
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      // Currently gets the wrong type of user - need to store userDetails in cookies really.
      // if (!authUser.userId) {
      //   let currentUser = await getCurrentUser() || {};
      //   setAuthUser(currentUser);
      // }
    })();
  }, []);

  const handleSignOut = function () {
    firebaseSignOut();
  }

  const handleSignIn = function (userData) {
    let { data, ...userProfile } = userData;
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

  console.log(authUser);

  return <View style={styles.app}>
    {!authUser.userId &&
      <Gate isSignIn={true} handleError={e => alert(e)} handleSignIn={handleSignIn} listenersCallback={listenersHandler} />
    }
    {userLoaded &&
      <View style={styles.app}>
        <Nav setPage={setPage} />
        {page == 'requests' &&
          <Requests sentRequests={firebaseArrayConvert(sentRequests)} receivedRequests={firebaseArrayConvert(receivedRequests)} takePhotos={takePhotos} viewPhotos={viewPhotos} user={authUser} />
        }
        {page == 'mates' &&
          <Mates mates={firebaseArrayConvert(mates)} user={authUser} />
        }
        {page == 'take' &&
          <Take request={requestTaking} user={authUser} />
        }
        {page == 'view' &&
          <View style={styles.page}>
            <Image
              style={styles.backPhoto}
              source={{ uri: requestViewing.backUrl }}
            />
            <Image
              style={{ width: width * .4, height: width * .5, left: width * .5, top: width * .2, position: 'absolute' }}
              source={{ uri: requestViewing.frontUrl }}
            />
          </View>
        }
      </View>
    }
  </View>
}