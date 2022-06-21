const navHeight = 60;
const width = 414;
const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const fill = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

const input = {
    width: width * .8,
    height: 35,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 2
}

export const styles = {
    app: {
        ...flexCenter,
        ...fill,
        backgroundColor: '#eee'
    },
    page: {
        ...flexCenter,
        ...fill,
        bottom: navHeight,
    },
    input: {
        ...input
    },
    textInput: {
        ...input,
        padding: 9
    },
    nav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: navHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    navItem: {
        width: 100,
        height: navHeight,
        backgroundColor: 'lightblue'
    },
    receivedRequest: {
        ...input,
        ...flexCenter,
        backgroundColor: 'pink',
        height: 50
    },
    sentRequest: {
        ...input,
        ...flexCenter,
        height: 50
    },
    requestPending: {
        backgroundColor: 'salmon',
        fontStyle: 'italic'
    },
    requestNew: {
        backgroundColor: 'lightblue',
        fontWeight: 'bold'
    },
    requestSeen: {
        backgroundColor: 'lightgrey'
    },
    backPhoto: {
        ...fill,
    },
    // Get this shit off the screen.
    camera: {
        position: 'absolute',
        top: -100
    }
}