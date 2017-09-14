import {data, users, socket, response, event, logger} from 'syncano-server'
const {model, id} = ARGS
const modelData = typeof ARGS.data === "string" ? JSON.parse(ARGS.data) : ARGS.data;
import {getPermissions} from './helpers/permissions.js'
update()

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
  const canUpdate = await getPermissions(model, 'u')
  if (canUpdate.user) {
    await updateUserModel(canUpdate)
  }
  if (canUpdate) {
    await updateModel()
  } else {
    response.json('Insufficent privileges')
  }
}
