export default {
  title: 'Usuario',
  name: 'user',
  type: 'document',
  initialValue: {
    admin: false
  },
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Primer apellido',
      name: 'flname',
      type: 'string',
    },
    {
      title: 'Segundo apellido',
      name: 'slname',
      type: 'string',
    },
    {
      title: 'Correo electrónico',
      name: 'email',
      type: 'slug',
    },
    {
      title: 'Contraseña',
      name: 'password',
      type: 'string',
      hidden: true
    },
    {
      title: 'Número de teléfono',
      name: 'phone_number',
      type: 'string',
      initialValue: ''
    },
    {
      title: '¿Es un administrador?',
      name: 'admin',
      type: 'boolean',
      initialValue: false
    },
    {
      title: 'Suscripción',
      name: 'subscription',
      type: 'object',
      fields: [
        {
          title: 'Plan',
          name: 'plan',
          type: 'reference',
          to: [{ type: 'plan' }],
        },
        {
          title: 'Activo',
          name: 'active',
          type: 'boolean',
        },
        {
          title: 'Fecha inicial',
          name: 'starting_date',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
            calendarTodayLabel: 'Today'
          }
        },
        {
          title: 'Fecha final',
          name: 'ending_date',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
            calendarTodayLabel: 'Today'
          },
        },
      ],
      initialValue: {
        plan:{
          _ref: '1c452ebc-d7e6-4348-b713-a97a4856f667'
        },
        active: false,
        starting_date: (new Date()).toISOString(),
        ending_date: (new Date()).toISOString()
      },
    },
    {
      title: 'Medidas',
      name: 'measures',
      type: 'object',
      initialValue: {
        height: 0,
        weight: 0,
        bmi: 0,
        muscle_percentage: 0,
        body_fat_percentage: 0,
        bone_percentage: 0
      },
      fields: [
        {
          title: 'Altura (cm)',
          name: 'height',
          type: 'number',
          initialValue: 0
        },
        {
          title: 'Peso (kg)',
          name: 'weight',
          type: 'number',
          initialValue: 0
        },
        {
          title: 'IMC',
          name: 'bmi',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.precision(2),
        },
        {
          title: 'Porcentaje muscular',
          name: 'muscle_percentage',
          type: 'number',
          initialValue: 0
        },
        {
          title: 'Porcentaje de grasa corporal',
          name: 'body_fat_percentage',
          type: 'number',
          initialValue: 0
        },
        {
          title: 'Porcentaje óseo',
          name: 'bone_percentage',
          type: 'number',
          initialValue: 0
        },
      ]
    }
  ],
}
