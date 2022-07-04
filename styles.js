const widthPx = 414;
const padding = 9;
const doublePadding = 9 * 2;
const borderRadius = 2;
const height = 35;
const navHeight = height + doublePadding * 2;

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
    stasis: '#AD2017',
    anticipation: '#243B68',
    alert: '#D06C75',
    empty: '#251111',

    body: '#121923',
    secondary: '#AD2017',
    accent: '#FF999B',
    text: '#FFFFFF',

    white: '#FFFFFF'
}

const input = {
    ...width,
    height: height,
    marginBottom: padding,
    backgroundColor: 'white',
    borderRadius: borderRadius
}

export const styles = {
    // Basic styles
    width: width,
    flexRow: flexRow,
    flexCenter: flexCenter,

    // Main container styles
    app: {
        ...flexCenter,
        ...fill,
        backgroundColor: colors.body,
        color: colors.text
    },
    page: {
        ...flexCenter,
        ...fill,
        bottom: navHeight,
        padding: doublePadding
    },

    // Form styles
    buttonColor: colors.secondary,
    text: { color: colors.text },

    input: {
        ...input
    },
    textInput: {
        ...input,
        padding: padding
    },
    lookALink: {
        fontSize: 14,
        color: colors.text,
        margin: 'auto',
        padding: padding
    },
    alert: {
        ...input,
        ...flexCenter
    },

    icon: {
        height: height - padding,
        width: height - padding,
    },

    iconSmall: {
        height: height - doublePadding,
        width: height - doublePadding,
    },

    // Nav styles
    navHeight: navHeight,
    nav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: navHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItemContainer: {
        ...flexCenter,
        height: navHeight - padding,
        borderRadius: (navHeight - padding) / 2,
        backgroundColor: colors.white
    },
    navItem: {
        ...flexCenter,
        width: navHeight - doublePadding,
        height: navHeight - doublePadding,
        borderRadius: (navHeight - doublePadding) / 2,
        backgroundColor: colors.secondary,
    },

    // Mates styles
    mate: {
        ...flexRow,
        ...input,
        paddingLeft: padding
    },
    mateButtonContainer: {
        ...flexRow,
        width: height * 2.6,
        height: '100%',
        borderRadius: borderRadius,
    },
    mateButton: {
        ...flexCenter,
        width: height * 1.3,
        height: '100%',
    },

    // Sent requests
    requestwaiting: {
        backgroundColor: colors.anticipation,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    },
    requestview: {
        backgroundColor: colors.alert,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    },
    requestwuu2: {
        backgroundColor: colors.stasis,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    },
    // Received requests
    requestempty: {
        backgroundColor: colors.white,
    },
    requestseen: {
        backgroundColor: colors.empty,
    },
    requestrespond: {
        backgroundColor: colors.alert,
    },
    requestreplied: {
        backgroundColor: colors.anticipation,
    },

    // Camera stuff
    backPhoto: {
        ...fill,
    },
    // Get this shit off the screen.
    camera: {
        position: 'absolute',
        // Magic number alert
        top: -100
    },
    takeButton: {
        position: 'absolute',
        backgroundColor: colors.secondary,
        ...flexCenter
    }
}