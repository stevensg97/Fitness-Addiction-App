export default {
  title: 'Plan',
  name: 'plan',
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
          {title: 'Sin suscripción', value: 'no subscription'},
          {title: 'Funcional', value: 'functional'},
          {title: 'Musculación', value: 'musculation'},
          {title: 'Funcional y Musculación', value: 'functional and musculation'},
          {title: 'Pilates', value: 'pilates'}
        ]
      }
    },
    {
      title: 'Días',
      name: 'days',
      type: 'string',
      options: {
        list: [
          {title: '30', value: '30'},
          {title: '15', value: '15'},
          {title: '7', value: '7'},
          {title: '1', value: '1'}
        ]
      }
    },
    {
      title: 'Precio',
      name: 'price',
      type: 'number',
    }
  ]
}
