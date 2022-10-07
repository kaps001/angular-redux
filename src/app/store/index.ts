import { combineReducers } from 'redux';

import { UsersReducer } from './user.reducer';
import { Users } from '../model/user';

export class AppState {
  users: Users;
};

export const rootReducer = combineReducers<AppState>({
  users: UsersReducer,
});


