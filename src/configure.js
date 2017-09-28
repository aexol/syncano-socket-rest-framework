import Server from 'syncano-server'
export default (ctx) =>{
  const {data, users, socket, response, event, logger,instance} = Server(ctx);
  const {config, key} = ctx.args
  const {REST_FRAMEWORK_KEY} = ctx.config
  if (key === REST_FRAMEWORK_KEY) {
    createOrUpdate()
  } else {
    response.json({
      status: 'Incorrect rest framework key'
    })
  }
  async function createOrUpdate () {
    try {
      let firstConfigObject = await data.rest_framework_config_class.firstOrFail()
      try {
        response.json(
          await data.rest_framework_config_class.update(firstConfigObject.id, {
            config
          })
        )
      } catch (badResponse) {
        response.json({
          badResponse,
          status: 'bad json format'
        })
      }
    } catch (badResponse) {
      response.json(await data.rest_framework_config_class.create({config}))
    }
  }
}
