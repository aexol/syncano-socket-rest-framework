import {data, users, socket, response, event, logger} from 'syncano-server'
const {key} = ARGS
const {REST_FRAMEWORK_KEY} = CONFIG
if (key === REST_FRAMEWORK_KEY) {
  getConfig()
} else {
  response.json({
    status: 'Incorrect rest framework key'
  })
}
async function getConfig () {
  try {
    response.json(await data.rest_framework_config_class.firstOrFail())
  } catch ({data}) {
    response.json({
      data,
      status: 'please create config call rest-framework/configure'
    })
  }
}