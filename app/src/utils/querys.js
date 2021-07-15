export const ROUTINES = `*[_type == 'routine']{
    _id, name, type, image, exercises[]{sets, repetitions, rest, cadency, superset, exercise->{_id, name, image, muscle->{name}}}
  }`

export const ADS = `*[_type == 'ad']{
    _id, name, type, image, description, datetime, people_limit, people
  }`

export const INFORMATION = `*[_type == 'information']{
    phone_number, email, location, social_networks
  }`

export const USER = `*[_type == 'user']{
    name, flname, slname, email, password, phone_number, subscription, measures
  }`

