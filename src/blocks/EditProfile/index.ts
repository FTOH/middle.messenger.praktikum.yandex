/* eslint-disable @typescript-eslint/naming-convention */
import { connect } from 'utils/connect'
import { EditProfile } from './editProfile'

export const EditProfileWithState = connect(EditProfile, (state) => {
  const { user } = state
  if (!user) return

  const {
    email,
    login,
    first_name,
    second_name,
    phone,
    display_name,
  } = user
  return {
    email,
    login,
    first_name,
    second_name,
    phone,
    display_name,
  }
})
