import {data, users, socket, response, event, logger} from 'syncano-server'
const {model} = ARGS
import {getPermissions} from './helpers/permissions.js'
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
  const canSee = await getPermissions(model, 'r')
  if (canSee.user) {
    await listUserModel(canSee)
  }
  if (canSee) {
    await listModel()
  }
}
show()
