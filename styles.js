const navHeight = 60;
const widthPx = 414;
const padding = 9;
const borderRadius = 2;

const width = {
    width: widthPx,
    maxWidth: '100%'
}

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const flexRow = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const fill = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

const colors = {
    primary: '#9B00CE',
    secondary: '#CE009A',
    callout: '#CE9B00',
    primaryDark: '#802ad9',
    primaryLight: '#a32ad9',
    complementAlert: '#DF0037',
    complementOk: '#A6DF00',
    white: 'white',
    gray: 'lightgray',
    black: 'black'
}

const input = {
    ...width,
    height: 35,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: borderRadius
}

export const styles = {
    // Basic styles
    width: width,
    flexRow: flexRow,

    // Main container styles
    app: {
        ...flexCenter,
        ...fill,
        backgroundColor: colors.primary,

    },
    page: {
        ...flexCenter,
        ...fill,
        bottom: navHeight,
        padding: 30
    },

    // Form styles
    buttonColor: colors.secondary,

    input: {
        ...input
    },
    textInput: {
        ...input,
        padding: padding
    },
    lookALink: {
        fontSize: 14,
        color: colors.white,
        margin: 'auto',
        padding: padding
    },
    alert: {
        ...input,
        ...flexCenter
    },

    // Nav styles
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
        ...flexCenter,
        ...width,
        height: navHeight,
        backgroundColor: colors.secondary
    },

    // Mates styles
    mate: {
        ...flexRow,
        ...input,
        paddingLeft: padding
    },
    mateButton: {
        ...flexCenter,
        width: '50%',
        height: '100%',
        borderRadius: borderRadius
    },
    mateButtonContainer: {
        ...flexRow,
        width: '50%',
        height: '100%',
    },

    // Requests styles
    receivedRequest: {
        ...input,
        ...flexCenter,
        backgroundColor: colors.complementAlert,
        height: 50
    },
    sentRequest: {
        ...input,
        ...flexCenter,
        height: 50
    },
    requestwaiting: {
        backgroundColor: colors.complementAlert,
        fontStyle: 'italic'
    },
    requestview: {
        backgroundColor: colors.complementOk,
        fontWeight: 'bold'
    },
    requestwuu2: {
        backgroundColor: colors.callout
    },
    requestnothin: {
        backgroundColor: colors.gray,
        fontStyle: 'italic'
    },
    requestseen: {
        backgroundColor: colors.gray,
    },
    requestrespond: {
        backgroundColor: colors.complementOk,
        fontWeight: 'bold'
    },
    requestreplied: {
        backgroundColor: colors.callout
    },

    // Camera stuff
    backPhoto: {
        ...fill,
    },
    // Get this shit off the screen.
    camera: {
        position: 'absolute',
        top: -100
    }
}