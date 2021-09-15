import { Navigator } from "../navigator";

// const initialState = {
//   index: 0,
//   routes: [
//     {
//       routeName: "PreferencesScreen"
//     }
//   ]
// };

export default (state, action) =>
  Navigator.router.getStateForAction(action, state) || state;
