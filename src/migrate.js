import axios from 'axios'
import Server from 'syncano-server'
export default (ctx) =>{
  const {data, users, socket, response, event, logger,instance} = Server(ctx);
  const {model, link, key, token, header} = ctx.args
  const {REST_FRAMEWORK_KEY} = ctx.config
  const log = logger('Migrate')
  if (key === REST_FRAMEWORK_KEY) {
    migrate().then(() => {}).catch(({data}) => {
      response.json(data)
    })
  } else {
    response.json({
      status: 'Incorrect rest framework key'
    })
  }
  async function migrate () {
    let conf = {}
    if (token && header) {
      conf.headers = {
        [header]: token
      }
    }
    let oldObjects = await (await axios.get(link, conf)).json()
    if (typeof oldObjects !== 'array') {
      return response.json({
        status: `Not an array, type of response(${typeof oldObjects})`
      })
    }
    try {
      const obj = await data[model].create(oldObjects[0])
      return response.json(obj)
    } catch ({data}) {
      return response.json(data)
    }
  }
}
