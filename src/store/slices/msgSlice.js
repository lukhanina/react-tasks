// import update from 'react-addons-update';
// import { createSlice } from '@reduxjs/toolkit';
// import '../../components/containers/ChatList/static/images/avatar/robot.png';
// import '../../components/containers/ChatList/static/images/avatar/girl.jpg';

// const msgSlice = createSlice({
//   name: 'msg',
//   initialState: {},
//   reducers: {
//     addNewMsg (state, action) {
//       return update(state, {
//         [action.payload.chatId]: {
//           messages: {
//             $push: [action.payload.data]
//           }
//         }
//       })
//     },
//     loadMsg (state, action) {
//       return update(state, {
//         $merge: {
//           ...action.payload
//         }
//       }
//       );
//     }
//   }
// })

// export default msgSlice.reducer;
// export const { addNewMsg, loadMsg } = msgSlice.actions;
