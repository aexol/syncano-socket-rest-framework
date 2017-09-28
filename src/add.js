import {transform} from './helpers/transform'
import {getPermissions} from './helpers/permissions.js'
import Server from 'syncano-server'
export default ctx => {
  const server = Server(ctx)
  const {data, users, socket, response, event, logger, instance} = server
  const {model} = ctx.args
  const modelData = transform(
    typeof ctx.args.data === 'string'
      ? JSON.parse(ctx.args.data)
      : ctx.args.data
  )
  async function addModel () {
    try {
      response.json(await data[model].create(modelData))
    } catch (error) {
      response.json(error)
    }
  }
  async function create () {
    const canCreate = await getPermissions(model, 'c', ctx.meta.user, server)
    if (canCreate) {
      addModel()
    } else {
      response.json('Insufficent privileges')
    }
  }
  create()
}
