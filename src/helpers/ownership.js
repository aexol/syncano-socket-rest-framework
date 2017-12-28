import Server from '@syncano/core'
export default async (ctx, owners) => {
  const { data } = Server(ctx)
  try {
    const { user } = ctx.meta
    const { model, id } = ctx.args
    let query = data[model]
    query = query.where('id', id)
    let ownership = (await Promise.all(owners.map(async o =>
      query.where(o, user.id).list()
    ))).filter(o => o.length)
    if (!ownership.length) {
      return false
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
