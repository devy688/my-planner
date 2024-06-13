import axios from 'axios';
import {
    fetchGoalsStart,
    fetchGoalsSuccess,
    fetchGoalsFailure,
} from './goalsSlice';
// import { fetchListsStart, fetchListsSuccess, fetchListsFailure } from './listsSlice';

export const fetchGoals = (userId) => async (dispatch) => {
    dispatch(fetchGoalsStart());
    try {
        const response = await axios.post('/api/goals/read', { userId });
        dispatch(fetchGoalsSuccess(response.data.goals));
    } catch (error) {
        dispatch(fetchGoalsFailure(error.toString()));
    }
};

// export const fetchLists = (userId) => async (dispatch) => {
//     dispatch(fetchListsStart());
//     try {
//         const response = await axios.post('/api/lists/read', { userId });
//         dispatch(fetchListsSuccess(response.data.lists));
//     } catch (error) {
//         dispatch(fetchListsFailure(error.toString()));
//     }
// };
