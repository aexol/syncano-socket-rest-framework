import {data, users, socket, response, event, logger} from 'syncano-server'
const {user} = META
function hasPermission (o, p) {
  return o.type.indexOf(p) !== -1
}
function notLoggedIn () {
  response.json({
    status: 403,
    error: 'User not logged in'
  })
}
function notAnOwner () {
  response.json({
    status: 403,
    error: 'This user is not an owner user of this model'
  })
}
function notInModels () {
  response.json({
    status: 403,
    error: 'This model is not added to rest-framework socket config. Please add it to models'
  })
}
export async function getPermissions (model, permission_type) {
  const ccc = await getConfig()
  const {models = [], logged_in = [], object_level = []} = ccc
  if (models.indexOf(model) === -1) {
    notInModels()
  }
  try {
    const loggedInPermissions = logged_in.filter(
      p => hasPermission(p, permission_type) && p.model === model
    )
    if (loggedInPermissions.length && typeof user === undefined) {
      notLoggedIn()
    }
    for (let p of loggedInPermissions) {
      if (p.users && p.users.indexOf(user.id) === -1) {
        notAnOwner()
      }
    }
    const objectLevelPermissions = object_level.filter(
      p => hasPermission(p, permission_type) && p.model === model
    )
    if (objectLevelPermissions.length && typeof user === undefined) {
      return false
    }
    for (let p of objectLevelPermissions) {
      return {
        user,
        owner: p.owner_field
      }
    }
    return true
  } catch ({data}) {
    return true
  }
}
async function getConfig () {
  try {
    return (await data.rest_framework_config_class.firstOrFail()).config
  } catch (badResponse) {
    response.json({
      status: 'No config. Please configure rest framework: s call rest-framework/configure'
    })
  }
}
