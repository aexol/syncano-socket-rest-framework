import Server from '@syncano/core'
import isAdminUser from './helpers/isAdminUser'
export default async ctx => {
  const { data, response } = Server(ctx)
  const { config } = ctx.args
  if (isAdminUser(ctx)) {
    return createOrUpdate()
  }
  async function createOrUpdate () {
    try {
      let firstConfigObject = await data.rest_framework_config_class.firstOrFail()
      try {
        return response.json(
          await data.rest_framework_config_class.update(firstConfigObject.id, {
            config
          })
        )
      } catch (badResponse) {
        return response.json({
          badResponse,
          status: 'bad json format'
        })
      }
    } catch (badResponse) {
      return response.json(
        await data.rest_framework_config_class.create({ config })
      )
    }
  }
}
