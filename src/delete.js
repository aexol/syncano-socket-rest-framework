import { getPermissions } from './helpers/permissions.js'
import Server from '@syncano/core'
import { errors } from './helpers/messages'
import ownership from './helpers/ownership'

export default async ctx => {
  const server = Server(ctx)
  const { data, response } = server
  const { model, id } = ctx.args
  try {
    let canUpdate = await getPermissions('u', ctx)
    let { owners } = canUpdate
    if (owners) {
      canUpdate = await ownership(ctx, owners)
    }
    if (!canUpdate) {
      return response.json({ message: errors(403) }, 403)
    }
    await data[model].delete(id)
    return response.json(
      {
        id
      }
    )
  } catch (error) {
    return response.json({ message: error.message }, 400)
  }
}
