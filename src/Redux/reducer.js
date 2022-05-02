import * as _ from "lodash";
import { } from "./actions"
const UPDATE_DREAM_STORY = "updateDreamStory";
const initialState = {
    dreamStory: "",
    realityStory: "",
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DREAM_STORY:
            return Object.assign({}, state, {
                dreamStory: action.story,
            })
        default:
            return state
    }
}
export default reducer;