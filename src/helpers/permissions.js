import Server from '@syncano/core'
import isAdminUser from './isAdminUser'
export const getPermissions = async (permissionType, ctx) => {
  if (isAdminUser(ctx)) {
    return true
  }
  const { model } = ctx.args
  const { user } = ctx.meta
  const { data, response } = Server(ctx)
  const configModel = (await data.rest_framework_config_class.firstOrFail()).config
  const { models = [], logged_in = [], object_level = [] } = configModel
  const everyBodyPermissions = models.filter(
    p => hasPermission(p, permissionType) && p.model === model
  )
  if (everyBodyPermissions.length) {
    return true
  }
  // Check logged in users permissions
  const loggedInPermissions = logged_in.filter(
    p => hasPermission(p, permissionType) && p.model === model
  )
  if (loggedInPermissions.length && !user) {
    return false
  }
  // Check object level permissions
  const objectLevelPermissions = object_level.filter(
    p => hasPermission(p, permissionType) && p.model === model
  )
  if (objectLevelPermissions.length) {
    if (!user) {
      return false
    }
    return {
      owners: objectLevelPermissions.map(p => p.owner)
    }
  }
  return false
  function hasPermission(o, p) {
    return o.type.indexOf(p) !== -1
  }
}
