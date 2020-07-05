import { ProfileUserModel } from './profile-view-model.js';

export function transformToComponentFormat(data) {
  return data.map(function (item) {
    return new ProfileUserModel(item);
  })
}