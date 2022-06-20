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

export const styles = {
    page: {
        ...flexCenter,
        ...fill,
        bottom: navHeight,
    },
    app: {
        ...flexCenter,
        ...fill,
    },
    input: {
        width: width,
        maxWidth: '100%',
        marginBottom: 10
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
        backgroundColor: 'pink',
        marginBottom: 10
    },
    sentRequest: {
        marginBottom: 10
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