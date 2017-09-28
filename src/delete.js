import {getPermissions} from './helpers/permissions.js'
import Server from 'syncano-server'
export default ctx => {
  const server = Server(ctx)
  const {data, users, socket, response, event, logger, instance} = server
  const {model, id} = ctx.args

  del()

  async function deleteUserModel ({user, owner}) {
    try {
      let ownedModel = await data[model]
        .where(owner, user)
        .where('id', id)
        .firstOrFail()
      await deleteModel()
    } catch (error) {
      response.json(error)
    }
  }
  async function deleteModel () {
    try {
      response.json(await data[model].delete(id))
    } catch (error) {
      response.json(error)
    }
  }
  async function del () {
    const canDelete = await getPermissions(model, 'd', ctx.meta.user, server)
    if (canDelete.user) {
      await deleteUserModel(canDelete)
    }
    if (canDelete) {
      await deleteModel()
    } else {
      response.json('Insufficent privileges')
    }
  }
}
