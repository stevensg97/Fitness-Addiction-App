export const ROUTINES = `*[_type == 'routine']{
    _id, name, type, image, exercises[]{sets, repetitions, rest, exercise->{_id, name, image, muscle->{name}}}
  }`

export const ADS = `*[_type == 'ad']{
    _id, name, type, image, description, datetime, people_limit, people
  }`

