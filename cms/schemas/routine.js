import React from 'react';

export default {
  title: 'Routine',
  name: 'routine',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Exercises',
      name: 'exercises',
      type: 'array',
      of: [
        {
          name: 'workout',
          type: 'object',
          fields: [
            {
              title: 'Exercise',
              name: 'exercise',
              type: 'reference',
              to: [{type: 'exercise'}]
            },
            {
              title: 'Sets',
              name: 'sets',
              type: 'number',
            },
            {
              title: 'Repetitions',
              name: 'repetitions',
              type: 'number',
            },
            {
              title: 'Rest',
              name: 'rest',
              type: 'object',
              fields: [
                {
                  title: 'Quantity',
                  name: 'quantity',
                  type: 'number',
                },
                {
                  title: 'Unit',
                  name: 'unit',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Minutes', value: 'min'},
                      {title: 'Seconds', value: 's'}
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
                subtitle: `Sets: ${sets} | Reps: ${repetitions} | Rest: ${restQuantity}${restUnit}`,
                media: <img src={imageUrl}/>
              }
            }
          }
        },
      ]
    },
  ]
}
