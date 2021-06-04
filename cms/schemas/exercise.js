export default {
  title: 'Ejercicio',
  name: 'exercise',
  type: 'document',
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Imagen',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Músculo',
      name: 'muscle',
      type: 'reference',
      to: [{type: 'muscle'}]
    }
  ]
}
