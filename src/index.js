import every from "lodash/every"
import filter from "lodash/filter"
import find from "lodash/find"
import isEqual from "lodash/isEqual"
import isMatch from "lodash/isMatch"
import isObject from "lodash/isObject"

let actions = []
let isEql = isEqual

const storeActionsMiddleware = store => next => action => {
  if (typeof action !== "function") {
    actions.push(action)
  }

  return next(action)
}

const compare = (...args) => {
  return every(args, (arg) => {
    let result

    if (isObject(arg)) {
      const matches = filter(actions, (action) => {
        return action.type == arg.type
      })

      result = find(matches, (match) => isEql(match, arg))

    } else {
      result = find(actions, (action) => {
        return action.type == arg
      })
    }

    return !!result
  })
}

const matches = (...args) => {
  isEql = isMatch
  return compare(...args)
}

const has = (...args) => {
  isEql = isEqual
  return compare(...args)
}

const storeActions = { 
  has,
  matches,
  clear:   () => actions = [],
  actions: () => actions
}

export {
  storeActionsMiddleware,
  storeActions
}
