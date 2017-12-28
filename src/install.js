import Server from '@syncano/core'
export default async ctx => {
  const {response, users} = Server(ctx)
  const {SUPERUSER, SUPERUSER_PASSWORD} = ctx.config
  try {
    const isSuperUserCreated = await users.where('username', SUPERUSER).list()
    if (isSuperUserCreated.length > 0) {
      return {
        status: 'Already installed everything no need to call this endpoint anymore'
      }
    }
    await users.create({
      username: SUPERUSER,
      password: SUPERUSER_PASSWORD
    })
    return response.json({
      status: 'Successfully installed rest-framework'
    })
  } catch ({message}) {
    return response.json(message, 400)
  }
}
