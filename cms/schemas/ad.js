export default {
  title: 'Anuncio',
  name: 'ad',
  type: 'document',
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Tipo',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Anuncio', value: 'ad' },
          { title: 'Evento', value: 'event' }
        ]
      }
    },
    {
      title: 'Imagen',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Descripción',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Fecha y hora',
      name: 'datetime',
      type: 'datetime'
    },
    {
      title: 'Límite de personas',
      name: 'people_limit',
      type: 'number'
    },
    {
      title: 'Personas',
      name: 'people',
      type: 'array',
      of: [
        {
          title: 'Usuario',
          name: 'user',
          type: 'reference',
          to: [{ type: 'user' }]
        }
      ]
    }
  ]
}
