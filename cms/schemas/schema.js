import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import information from './information'
import muscle from './muscle'
import exercise from './exercise'
import routine from './routine'
import plan from './plan'
import ad from './ad'
import user from './user'
import weight from './weight'

export default createSchema({
  name: 'Schema',
  types: schemaTypes.concat([
    information,
    muscle,
    exercise,
    routine,
    plan,
    ad,
    user,
    weight
  ])
})
