import {data, users, socket, response, event, logger} from 'syncano-server'
const {model} = ARGS
const modelData = typeof ARGS.data === "string" ? JSON.parse(ARGS.data) : ARGS.data;
import {getPermissions} from './helpers/permissions.js'
async function addModel () {
  try {
    response.json(await data[model].create(modelData));
  } catch (error) {
    response.json(error)
  }
}
async function create () {
  const canCreate = await getPermissions(model, 'c')
  if (canCreate) {
    addModel()
  } else {
    response.json('Insufficent privileges')
  }
}
create()
