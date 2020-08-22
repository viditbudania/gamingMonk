import * as types from '../actions/actionTypes';

const initialState = {

    testApiResponse: [],
    testApiFailure: "",
    totalInd : 0
}

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {

        case types.TEST_API_FAILURE: {
            return { ...state, testApiResponse: [], testApiFailure: action.payload  }
        }
        case types.TEST_API_SUCCESS: {
            return { ...state, testApiResponse: action.payload, testApiFailure: "" }
        }

        case types.TOTALINDEX: {
            return { ...state, totalInd: action.payload }
        }

        case types.CLEAN: {
            return { ...state, totalInd: 0, testApiResponse : [], testApiFailure : '' }
        }

        default: {
            return { ...state }
        }

    }
}