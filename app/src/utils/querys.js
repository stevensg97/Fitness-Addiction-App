export const ROUTINES = `*[_type == 'routine'] | order(name) {
    _id, name, type, image, exercises[]{sets, repetitions, rest, cadency, superset, exercise->{_id, name, image, muscle->{name}}}
  }`

export const ADS = `*[_type == 'ad'] | order(name) {
    _id, name, type, image, description, datetime, people_limit, people
  }`

export const PRODUCTS = `*[_type == 'product'] | order(name) {
    _id, name, image, description, price, quantity
  }`

export const INFORMATION = `*[_type == 'information']{
    phone_number, email, location, social_networks
  }`

export const SCHEDULE = `*[_type == 'information']{
    schedule
  }`

export const USERS = `*[_type == 'user'] | order(name) {
    _id, name, flname, slname, email, phone_number, history, measures, subscription{active, starting_date, ending_date, active, plan->{name}}
  }`

export function USER(email) {
  return (`*[_type == 'user' && email.current == \'${email}\']{
    _id, name, flname, slname, email, image, password, phone_number, measures, subscription{active, starting_date, ending_date, active, plan->{name}}
  }`
  )
}

export function LOGIN(email) {
  return (`*[_type == 'user' && email.current == \'${email}\']{
    password, name, admin, image
  }`
  )
}

export const EXERCISES = `*[_type == 'exercise'] | order(name) {
  _id, name, image, muscle->{name}
}`


export function HISTORY(id) {
  return (`*[_type == 'history' && _id == \'${id}\']{
    weights
  }`
  )
}

export const PLANS = `*[_type == 'plan'] | order(name) {
  _id, name, type, price, days
}`
