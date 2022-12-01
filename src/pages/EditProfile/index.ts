import { EditProfileWithState } from 'blocks/EditProfile'
import { AuthController } from 'controllers/AuthController'
import { once } from 'utils/once'

export const EditProfilePage = once(() => {
  AuthController.getUserSilent()

  return new EditProfileWithState()
})
