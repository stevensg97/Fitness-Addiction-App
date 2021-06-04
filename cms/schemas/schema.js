import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import routine from './routine'
import muscle from './muscle'
import exercise from './exercise'

export default createSchema({
  name: 'Schema',
  types: schemaTypes.concat([
    user,
    routine,
    muscle,
    exercise
  ])
})
