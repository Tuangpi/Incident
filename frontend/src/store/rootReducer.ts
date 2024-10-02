import activeActionReducer from '@/store/activeActionReducer';
import hamburgerReducer from '@/pages/users/layout/store/hamburgerReducer';
import UserMenuDropDownReducer from '@/pages/users/layout/store/UserMenuDropDownReducer';
import { combineReducers } from '@reduxjs/toolkit';
import selectProjectReducer from '@/pages/customers/layout/store/selectProjectReducer';

const rootReducer = combineReducers({
    hamburger: hamburgerReducer,
    userDropdown: UserMenuDropDownReducer,
    activeAction: activeActionReducer,
    selectProject: selectProjectReducer
});

export default rootReducer;
