import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import routine from './routine'
import muscle from './muscle'
import exercise from './exercise'
import plan from './plan'

export default createSchema({
  name: 'Schema',
  types: schemaTypes.concat([
    muscle,
    exercise,
    routine,
    plan,
    user,
  ])
})
