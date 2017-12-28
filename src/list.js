import { getPermissions } from './helpers/permissions.js'
import Server from '@syncano/core'
import { errors } from './helpers/messages'
export default async ctx => {
  const server = Server(ctx)
  const { data, response } = server
  const { model, filter } = ctx.args
  const { user } = ctx.meta
  try {
    const canSee = await getPermissions('r', ctx)
    let query = data[model]
    let { owners } = canSee
    if (filter) {
      filter.forEach(f => {
        query = query.where(...f)
      })
    }
    if (owners) {
      return response.json((await Promise.all(owners.map(async o =>
        query.where(o, user.id).list()
      ))).reduce((a, b) => [...a, ...b]))
    }
    if (canSee) {
      return response.json(
        await query.list()
      )
    }
    return response.json({ message: errors(403) }, 403)
  } catch (error) {
    return response.json({
      message: error.message
    }, 400)
  }
}
