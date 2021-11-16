
// get
export const getItem = name => {
  const data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// set
export const setItem = (name, val) => {
  if (val instanceof Object) {
    val = JSON.stringify(val)
  }
  localStorage.setItem(name, val)
}

// remove
export const removeItem = name => {
  localStorage.removeItem(name)
}
