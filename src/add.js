import { getPermissions } from './helpers/permissions.js'
import Server from '@syncano/core'
import { toFormData } from './helpers/utils'
import { errors } from './helpers/messages'
export default async ctx => {
  const server = Server(ctx)
  const { data, response } = server
  const { model, ...modelData } = ctx.args
  try {
    const canCreate = await getPermissions('c', ctx)
    if (canCreate) {
      return response.json(
        await data[model].create(toFormData(modelData))
      )
    } else {
      return response.json({ message: errors(403) }, 403)
    }
  } catch (error) {
    return response.json({ message: error.message }, 400)
  }
}
