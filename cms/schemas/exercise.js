export default {
  title: 'Exercise',
  name: 'exercise',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Muscle',
      name: 'muscle',
      type: 'reference',
      to: [{type: 'muscle'}]
    }
  ]
}
