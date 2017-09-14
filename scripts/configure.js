import {data, users, socket, response, event, logger} from 'syncano-server'
const {config, key} = ARGS
const {REST_FRAMEWORK_KEY} = CONFIG
const conf = ARGS.config
if (key === REST_FRAMEWORK_KEY) {
  createOrUpdate()
} else {
  response.json({
    status: 'Incorrect rest framework key'
  })
}
async function createOrUpdate () {
  const debug = logger("deb").debug;
  try {
    let firstConfigObject = await data.rest_framework_config_class.firstOrFail()
    try {
      response.json(await data.rest_framework_config_class.update(firstConfigObject.id, {config:conf}));
    }catch(badResponse){
      response.json({
        badResponse,
        status:"bad json format"
      })
    }
  } catch (badResponse) {
      response.json(await data.rest_framework_config_class.create(config))
  }
}
