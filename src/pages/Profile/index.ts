// import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { UserProfileWithState } from 'blocks/UserProfile'
import { Block } from 'core/Block'
import { MainLayout } from 'layouts/MainLayout'
import { once } from 'utils/once'
import { createElement } from 'utils/createElement'
import { ProfileController } from 'controllers/ProfileController'
import { AuthController } from 'controllers/AuthController'

export const ProfilePage = once(() => {
  AuthController.getUserSilent()

  const avatarUploader = createElement('input', {
    type: 'file',
    accept: 'image/*',
  }) as HTMLInputElement

  const form = new Form({
    header: 'Профиль',
    rows: [
      new UserProfileWithState({
        onChooseAvatar() {
          avatarUploader.click()
        },
      }),
    ],
  })

  avatarUploader.oninput = () => {
    if (avatarUploader.files?.length) {
      const file = avatarUploader.files[0]
      ProfileController.editAvatar(file)
        .catch((error: string) => form.showError(error))
    }
  }

  return new MainLayout({ content: form as Block, backLink: '/messages' })
})
