export default {
  title: 'Historial',
  name: 'history',
  type: 'document',
  fields: [
    {
      title: 'Pesos por ejercicio',
      name: 'weights',
      type: 'array',
      of: [
        {
          title: 'Lista de Ejercicios',
          name: 'exercisesList',
          type: 'object',
          fields: [
            {
              title: 'Ejercicio',
              name: 'exercise',
              type: 'string',
            },
            {
              title: 'Historial',
              name: 'history',
              type: 'array',
              of: [
                {
                  title: 'Peso por fecha',
                  name: 'weightbydate',
                  type: 'object',
                  fields: [
                    {
                      title: 'Peso',
                      name: 'weight',
                      type: 'number',
                    },
                    {
                      title: 'Fecha',
                      name: 'date',
                      type: 'date'
                    }
                  ]
                }

              ]
            }
          ]
        }

      ]
    }
  ]
}
