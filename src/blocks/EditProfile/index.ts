import { connect } from 'utils/connect'
import { EditProfile } from './editProfile'

export const EditProfileWithState = connect(EditProfile, (state) => {
  const { user } = state
  if (!user) return

  return {
    email: user.email,
    login: user.login,
    first_name: user.first_name,
    second_name: user.second_name,
    phone: user.phone,
    display_name: user.display_name,
  }
})
