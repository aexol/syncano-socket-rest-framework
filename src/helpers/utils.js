import filetype from 'file-type'
import FormData from 'form-data'
export const isBuffer = value => {
  if (!(value instanceof Buffer)) {
    return [value]
  }
  let {
    ext,
    mime
  } = filetype(value)
  return [value, { filename: `file.${ext}`, filetype: mime }]
}
export const toFormData = o => Object.keys(o).reduce((a, b) => {
  a.append(b, ...isBuffer(o[b]))
  return a
}, new FormData())
