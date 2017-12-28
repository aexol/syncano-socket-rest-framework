export default ctx => {
  const { user } = ctx.meta
  const { ADMIN_USERS, SUPERUSER } = ctx.config
  if (!user) {
    return false
  }
  let isAdmin = ADMIN_USERS
    ? ADMIN_USERS.replace(' ', '').split(',').indexOf(user.username) !== -1 : false
  if (!isAdmin) {
    isAdmin = user.username === SUPERUSER
  }
  return isAdmin
}
