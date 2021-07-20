export default {
  title: 'Peso',
  name: 'weight',
  type: 'document',
  fields: [
    {
      title: 'Pesos',
      name: 'weights',
      type: 'array',
      of: [
        {
          title: 'Lista',
          name: 'list',
          type: 'object',
          fields: [
            {
              title: 'Ejercicio',
              name: 'exercise',
              type: 'reference',
              to: [{ type: 'exercise' }]
            },
            {
              title: 'Historial',
              name: 'history',
              type: 'array',
              of: [
                {
                  title: 'Peso',
                  name: 'weight',
                  type: 'number',
                }
              ]
            }
          ]
        }

      ]
    }
  ]
}
