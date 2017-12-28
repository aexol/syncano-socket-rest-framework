import Server from '@syncano/core'
import isAdminUser from './helpers/isAdminUser'
export default async ctx => {
  const { data, response } = Server(ctx)
  if (isAdminUser(ctx)) {
    return getConfig()
  }
  async function getConfig () {
    try {
      return response.json(await data.rest_framework_config_class.firstOrFail())
    } catch (error) {
      throw new Error('please create config call rest-framework/configure')
    }
  }
}
