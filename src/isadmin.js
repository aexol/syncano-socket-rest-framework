import Server from '@syncano/core'
export default async ctx => {
  const {response} = Server(ctx)
  try {
    const { user } = ctx.meta
    const {ADMIN_USERS} = ctx.config
    if (user && user.id) {
      if (ADMIN_USERS.replace(' ', '').split(',').indexOf(user.username) !== -1) {
        return response.json({
          admin: true
        })
      }
    }
    return response.json({
      admin: false
    })
  } catch ({message}) {
    return response.json(message, 400)
  }
}
