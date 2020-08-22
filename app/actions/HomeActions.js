
import { TEST_API_SUCCESS, TEST_API_FAILURE, CLEAN, TOTALINDEX } from './actionTypes'


export function testApiCall(payload) {
    return {
        type: TEST_API_SUCCESS,
        payload: payload
    }
}

export function testApiCallFail(payload) {
    return {
        type: TEST_API_FAILURE,
        payload: payload
    }
}

export function getTatalIndex(payload) {
    return {
        type: TOTALINDEX,
        payload: payload
    }
}

export function clearRedux(payload) {
    return {
        type: CLEAN,
        payload: payload
    }
}

