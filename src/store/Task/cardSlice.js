import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../rootstore";
import { cardCreate, dragCardUpdate, getCards } from "../../server/Task/getallCard";
import { newComment } from "../../server/Task/AddNewComment";
import { getComments } from "../../server/Task/GetComments";
import { cardEditUpdate } from "../../server/Task/CardEditUpdate";
import { inviteAssignee } from "../../server/Task/InviteNewAssignee";
import { getAssignee } from "../../server/Task/getAssignee";

// -----MIDDLEWARES---

// get all cards
export const getAllCards = createAsyncThunk('user/getAllCards', async ({ access, board }) => {
    const response = await getCards(access, board)
    return response
})

// create a new card
export const newCardCreate = createAsyncThunk('user/newCardCreate', async ({ access, id, title, description, maxNum, selectedEmails, selectedColor, priority }) => {
    const response = await cardCreate(access, id, title, description, maxNum, selectedEmails, selectedColor, priority);
    return response;
});


// drag card update
export const cardDragUpdate = createAsyncThunk('user/cardDragUpdate', async ({ droppableId, draggableId, access }) => {

    const response = await dragCardUpdate(droppableId, draggableId, access)

    return response
})


// add comment
export const addComment = createAsyncThunk('user/addComment', async ({ access, user_id, user_name, comment, card_id }) => {
    const response = await newComment(access, user_id, user_name, comment, card_id)
    console.log(response, "add comment fron thunk")
    return response
})

// get all comments
export const getAllComment = createAsyncThunk('user/getAllComment', async ({ access, card_id }) => {
    const response = await getComments(access, card_id)
    return response
})

// get all assignees
export const getAllAssignee = createAsyncThunk('user/getAllAssignee', async ({ access, card_id }) => {
    const response = await getAssignee(access, card_id)
    return response
})


// editable card data update
export const cardEditableUpdate = createAsyncThunk('user/cardEditableUpdate', async ({ access, card_id, updatedData }) => {
    const response = await cardEditUpdate(access, card_id, updatedData)
    console.log(response, "from card slice")
    if (response) {
        console.log(updatedData, "from card edit update thunk")
        updatedData.cardId = card_id
        return updatedData
    }
    else {
        return response
    }
})

// invite member
export const AssigneeInvite = createAsyncThunk('user/inviteMember', async ({ access, selectedEmails, card_id }) => {
    const response = await inviteAssignee(access, selectedEmails, card_id)
    console.log(response, "from assignee invite in thunk")
    return response
})


const cardSlice = createSlice({
    name: 'cardData',
    initialState: initialstate.cardData,
    reducers: {
        clearCards: (state) => {
            return initialstate.cardData;

        },
        cardsUpdate: (state, action) => {
            console.log(state, action.payload, "cards update")
            return {
                ...state,
                cards: action.payload || null,
            };
        },
        assigneeUpdate: (state, action) => {
            console.log(state, action.payload, "assignee update")
            return {
                ...state,
                assignee: action.payload || null,
            };
        },
        updateCardDeleteion: (state, action) => {
            console.log(state, action.payload, "update card deletion")
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCards.fulfilled, (state, action) => {
                return (
                    {
                        ...state, cards: action.payload?.length === 0 ? null : action.payload
                        
                    }
                )
            })
            .addCase(newCardCreate.fulfilled, (state, action) => {
                state.cards = state.cards === null ? [action.payload] : [...state.cards, action.payload];
                state.assignee = state.assignee === null ? [...action.payload.assignee] : [...state.assignee, ...action.payload.assignee];
            })
            .addCase(addComment.fulfilled, (state, action) => {
                console.log(state, action.payload, "add comment")
                return (
                    {
                        ...state,
                        comments: [...state.comments, action.payload],
                    }
                )
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                console.log(state, action.payload, "get all comment")
                return (
                    {
                        ...state,
                        comments: [...action.payload],
                    }
                )
            })
            .addCase(getAllAssignee.fulfilled, (state, action) => {
                console.log(state, action.payload, "get all assignee")
                return (
                    {
                        ...state,
                        assignee: [...action.payload],
                    }
                )
            })
            .addCase(cardEditableUpdate.fulfilled, (state, action) => {
                const updatedCardId = action.payload.cardId;
                const updatedCardData = action.payload;
                console.log(state, action.payload, updatedCardId, updatedCardData, "card edit update")

                return {
                    ...state,
                    cards: state.cards.map((card) =>
                        card.id === updatedCardId ? { ...card, ...updatedCardData } : card
                    ),
                };
            })
            .addCase(AssigneeInvite.fulfilled, (state, action) => {
                console.log(state, action.payload, "Assignee invite")
                return (
                    {
                        ...state,
                        assignee: [...state.assignee, ...action.payload],
                    }
                )
            })
            .addCase(cardDragUpdate.fulfilled, (state, action) => {
                const cardID = action.payload.id;
                const updatedCardData = action.payload;
                console.log(cardID, 'from cardSlice', updatedCardData);

                return {
                    ...state,
                    cards: state.cards?.map((card) => card.id === cardID ? { ...card, ...updatedCardData } : card)
                };
            })

    }
})

export const { clearCards, cardsUpdate, assigneeUpdate, updateCardDeleteion } = cardSlice.actions;
export default cardSlice.reducer;