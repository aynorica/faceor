import { ON_INPUT_CHANGE,
        LOAD_IMAGE_URL,
        BOX_DETAILS,
        LOAD_USER_INFO,
        CHANGE_SIGNIN_EMAIL,
        CHANGE_SIGNIN_PASSWORD,
        CHANGE_REGISTER_EMAIL,
        CHANGE_REGISTER_PASSWORD,
        CHANGE_REGISTER_NAME
} from './constants';

export const inputLoad = (text) => ({
    type: ON_INPUT_CHANGE,
    payload: text
});

export const setImageUrlLoad = (text) => ({
    type: LOAD_IMAGE_URL,
    payload: text
});

export const setBoxDetails = (object) => ({
    type: BOX_DETAILS,
    payload: object
});

export const loadUserInfo = (data) => ({
    type: LOAD_USER_INFO,
    payload: data
});

export const loadSignInEmail = (data) => ({
    type: CHANGE_SIGNIN_EMAIL,
    payload: data
});

export const loadSignInPassword = (data) => ({
    type: CHANGE_SIGNIN_PASSWORD,
    payload: data
});

export const loadRegisterEmail = (data) => ({
    type: CHANGE_REGISTER_EMAIL,
    payload: data
});

export const loadRegisterPassword = (data) => ({
    type: CHANGE_REGISTER_PASSWORD,
    payload: data
});

export const loadRegisterName = (data) => ({
    type: CHANGE_REGISTER_NAME,
    payload: data
});