import { connect } from 'utils/connect'
import { UserProfile } from './profile'

const resourceUrl = 'https://ya-praktikum.tech/api/v2/resources/'

export const UserProfileWithState = connect(UserProfile, (store) => {
  const { user } = store
  if (!user) return
  return {
    displayname: user.display_name ?? undefined,
    fullname: `${user.first_name} ${user.second_name}`,
    image: user.avatar ? `${resourceUrl}${user.avatar}` : undefined,
    mail: user.email,
    phone: user.phone,
    username: user.login,
  }
})
