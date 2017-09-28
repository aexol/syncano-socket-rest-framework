import FormData from 'form-data'
const tempImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='
function transformFile (f) {
  const {value, type} = f
  return [
    Buffer.from(value.split(',')[1], 'base64'),
    {filename: 'elo.png', filetype: 'image/gif'}
  ]
}
export function transform (o) {
  let fd = new FormData()
  let returnFormData = false
  Object.keys(o).map(k => {
    let val = o[k]
    if (
      typeof val === 'object' &&
      val.hasOwnProperty('type') &&
      val.type === 'file'
    ) {
      console.log("FDD return")
      returnFormData = true
      val = transformFile(val)
    } else if (typeof val === 'object') {
      val = [JSON.stringify(val)]
    }else{
      val = [val]
    }
    fd.append(k, ...val)
  })
  return returnFormData ? fd : o
}
