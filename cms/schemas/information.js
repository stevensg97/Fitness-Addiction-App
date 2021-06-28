export default {
  title: 'Información',
  name: 'information',
  type: 'document',
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image'
    },
    {
      title: 'Misión',
      name: 'mission',
      type: 'text'
    },
    {
      title: 'Visión',
      name: 'vision',
      type: 'text'
    },
    {
      title: 'Descripción',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Correo electrónico',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Teléfono',
      name: 'phone_number',
      type: 'string'
    },
    {
      title: 'Ubicación',
      name: 'location',
      type: 'string'
    },
    {
      title: 'Redes sociales',
      name: 'social_networks',
      type: 'object',
      fields: [
        {
          title: 'Facebook',
          name: 'facebook',
          type: 'url'
        },
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'url'
        },
      ]
    }
  ]
}
