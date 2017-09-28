import {getPermissions} from './helpers/permissions.js'
import Server from 'syncano-server'
export default ctx => {
  const server = Server(ctx)
  const {data, users, socket, response, event, logger, instance} = server
  const {model} = ctx.args
  async function listUserModel ({user, owner}) {
    try {
      response.json(await data[model].where(owner, user))
    } catch (error) {
      response.json(error)
    }
  }
  async function listModel () {
    try {
      response.json(await data[model].list())
    } catch (error) {
      response.json(error)
    }
  }
  async function show () {
    const canSee = await getPermissions(model, 'r', ctx.meta.user, server)
    if (canSee.user) {
      await listUserModel(canSee)
    }
    if (canSee) {
      await listModel()
    }
  }
  show()
}
