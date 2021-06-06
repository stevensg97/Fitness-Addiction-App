import React from 'react';

export default {
  title: 'Rutina',
  name: 'routine',
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
          {title: 'Hipertrofia', value: 'Hipertrofia'},
          {title: 'Funcional', value: 'Funcional'},
          {title: 'Pilates', value: 'Pilates'}
        ]
      }
    },
    {
      title: 'Imagen',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Ejercicios',
      name: 'exercises',
      type: 'array',
      of: [
        {
          title: 'Trabajo',
          name: 'workout',
          type: 'object',
          fields: [
            {
              title: 'Ejercicio',
              name: 'exercise',
              type: 'reference',
              to: [{type: 'exercise'}]
            },
            {
              title: 'Series',
              name: 'sets',
              type: 'number',
            },
            {
              title: 'Repeticiones',
              name: 'repetitions',
              type: 'number',
            },
            {
              title: 'Descanso',
              name: 'rest',
              type: 'object',
              fields: [
                {
                  title: 'Cantidad',
                  name: 'quantity',
                  type: 'number',
                },
                {
                  title: 'Unidad de tiempo',
                  name: 'unit',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Minutos', value: 'min'},
                      {title: 'Segundos', value: 's'}
                    ]
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              exercise: 'exercise.name',
              muscle: 'exercise.muscle.name',
              sets: 'sets',
              repetitions: 'repetitions',
              restQuantity: 'rest.quantity',
              restUnit: 'rest.unit',
              imageUrl: 'exercise.image.asset.url'
            },
            prepare(selection) {
              const {exercise, muscle, sets, repetitions, restQuantity, restUnit, imageUrl} = selection
              return {
                title: `${exercise} (${muscle})`,
                subtitle: `Series: ${sets} | Reps: ${repetitions} | Desc: ${restQuantity}${restUnit}`,
                media: <img src={imageUrl}/>
              }
            }
          }
        },
      ]
    },
    {
      title: '¿Publicar?',
      name: 'public',
      type: 'boolean',
    },
  ]
}
