import Server from '@syncano/core'
import fetch from 'axios'
export default async ctx => {
  const { response } = Server(ctx)
  try {
    const { token, instance } = ctx.meta
    const classesUrl = `https://api.syncano.io/v2/instances/${instance}/classes/`
    let resp = (await fetch({
      mehod: 'get',
      url: classesUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token
      }
    }))
    let { data: {
      objects
    } } = resp
    return response.json(
      objects.filter(o => o.name !== 'dummy' && o.name !== 'rest_framework_config_class').map(sch => ({
        name: sch.name,
        display: sch.name,
        fields: sch.schema
      }))
    )
  } catch ({ message }) {
    return response.json(message, 400)
  }
}
