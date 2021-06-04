export default {
  title: 'Plan',
  name: 'plan',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Functional', value: 'functional'},
          {title: 'Musculation', value: 'musculation'},
          {title: 'Functional and Musculation', value: 'functional and musculation'},
          {title: 'Pilates', value: 'pilates'}
        ]
      }
    },
    {
      title: 'Days',
      name: 'days',
      type: 'string',
      options: {
        list: [
          {title: '30 days', value: '30'},
          {title: '15 days', value: '15'},
          {title: '7 days', value: '7'},
          {title: '1 day', value: '1'}
        ]
      }
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    }
  ]
}
