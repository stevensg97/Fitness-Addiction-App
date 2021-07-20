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
    },
    {
      title: '¿Es un administrador?',
      name: 'admin',
      type: 'boolean',
    },
    {
      title: 'Pesos',
      name: 'weights',
      type: 'reference',
      to: [{ type: 'weight' }]
    },
    {
      title: 'Suscripción',
      name: 'subscription',
      type: 'object',
      initialValue: {
        active: false
      },
      fields: [
        {
          title: 'Plan',
          name: 'plan',
          type: 'reference',
          to: [{ type: 'plan' }]
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
          }
        },
      ]
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
        },
        {
          title: 'Peso (kg)',
          name: 'weight',
          type: 'number',
        },
        {
          title: 'IMC',
          name: 'bmi',
          type: 'number',
          validation: (Rule) => Rule.precision(2),
        },
        {
          title: 'Porcentaje muscular',
          name: 'muscle_percentage',
          type: 'number',
        },
        {
          title: 'Porcentaje de grasa corporal',
          name: 'body_fat_percentage',
          type: 'number',
        },
        {
          title: 'Porcentaje óseo',
          name: 'bone_percentage',
          type: 'number',
        },
      ]
    }
  ]
}
