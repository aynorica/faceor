import { ON_INPUT_CHANGE,
        LOAD_IMAGE_URL,
        BOX_DETAILS,
        LOAD_USER_INFO,
        CHANGE_SIGNIN_EMAIL,
        CHANGE_SIGNIN_PASSWORD,
        CHANGE_REGISTER_EMAIL,
        CHANGE_REGISTER_NAME,
        CHANGE_REGISTER_PASSWORD
} from './constants';

const initialStateInput ={
    input: '',
};

export const inputLoad = (state= initialStateInput, action={}) => {
    switch (action.type) {
        case ON_INPUT_CHANGE:
            return Object.assign({}, state, {input: action.payload});
        default:
            return state
    }
};

const initialImageURLState = {
    imageUrl: ''
};

export const imageUrlLoad = (state=initialImageURLState, action={}) => {
    switch (action.type) {
        case LOAD_IMAGE_URL:
            return Object.assign({}, state, {imageUrl: action.payload});
        default:
            return state;

    }
};

const initialBoxState = {
    box: {}
};

export const boxDetails = (state=initialBoxState, action={}) => {
    switch (action.type) {
        case BOX_DETAILS:
            return Object.assign({}, state, {box: action.payload})
        default:
            return state;
    }
};

const initialStateUser = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''

    }
};

export const userInfo = (state=initialStateUser, action={}) => {
    switch (action.type) {
        case LOAD_USER_INFO:
            return Object.assign({}, state, {user: action.payload});
        default:
            return state
    }
};

const initialSignInState = {
    signInEmail: '',
    signInPassword: ''
};

export const signInInfo = (state=initialSignInState, action={}) => {
    switch (action.type) {
        case CHANGE_SIGNIN_EMAIL:
            return Object.assign({}, state, {signInEmail: action.payload});
        case CHANGE_SIGNIN_PASSWORD:
            return Object.assign({}, state, {signInPassword: action.payload});
        default:
            return state;
    }
};

const initialRegisterState = {
    email: '',
    password: '',
    name: ''
};

export const registerInfo = (state=initialRegisterState, action={}) => {
    switch (action.type) {
        case CHANGE_REGISTER_EMAIL:
            return Object.assign({}, state, {email: action.payload});
        case CHANGE_REGISTER_PASSWORD:
            return Object.assign({}, state, {password: action.payload});
        case CHANGE_REGISTER_NAME:
            return Object.assign({}, state, {name: action.payload});
        default:
            return state;
    }
};















