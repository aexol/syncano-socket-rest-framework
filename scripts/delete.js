import {data, users, socket, response, event, logger} from 'syncano-server'
const {model, id } = ARGS
import {getPermissions} from './helpers/permissions.js'

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
  const canDelete = await getPermissions(model, 'c')
  if (canDelete.user) {
    await deleteUserModel(canDelete)
  }
  if (canDelete) {
    await deleteModel()
  } else {
    response.json('Insufficent privileges')
  }
}
