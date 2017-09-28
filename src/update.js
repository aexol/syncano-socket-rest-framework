import {transform} from './helpers/transform'
import {getPermissions} from './helpers/permissions.js'
import Server from 'syncano-server'
export default ctx => {
  const server = Server(ctx)
  const {data, users, socket, response, event, logger, instance} = server
  const {model, id} = ctx.args
  const modelData = transform(
    typeof ctx.args.data === 'string'
      ? JSON.parse(ctx.args.data)
      : ctx.args.data
  )
  async function updateUserModel ({user, owner}) {
    try {
      let ownedModel = await data[model]
        .where(owner, user)
        .where('id', id)
        .firstOrFail()
      await updateModel()
    } catch (error) {
      response.json(error)
    }
  }
  async function updateModel () {
    try {
      response.json(await data[model].update(id, modelData))
    } catch (error) {
      response.json(error)
    }
  }
  async function update () {
    const canUpdate = await getPermissions(model, 'u', ctx.meta.user, server)
    if (canUpdate.user) {
      await updateUserModel(canUpdate)
    }
    if (canUpdate) {
      await updateModel()
    } else {
      response.json('Insufficent privileges')
    }
  }
  update()
}
