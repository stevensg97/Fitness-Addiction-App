export default {
  title: 'User',
  name: 'user',
  type: 'document',
  initialValue: {
    admin: false
  },
  fields: [
    {
      title: 'First Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'First Last Name',
      name: 'flname',
      type: 'string',
    },
    {
      title: 'Second Last Name',
      name: 'slname',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'slug',
    },
    {
      title: 'Password',
      name: 'password',
      type: 'string',
      hidden: true
    },
    {
      title: 'Phone number',
      name: 'phone_number',
      type: 'string',
    },
    {
      title: 'Is an admin?',
      name: 'admin',
      type: 'boolean',
    },
    {
      title: 'Subscription',
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
          title: 'Active',
          name: 'active',
          type: 'boolean',
        },
        {
          title: 'Starting date',
          name: 'starting_date',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
            calendarTodayLabel: 'Today'
          }
        },
        {
          title: 'Ending date',
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
      title: 'Measures',
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
          title: 'Height (cm)',
          name: 'height',
          type: 'number',
        },
        {
          title: 'Weight (Kg)',
          name: 'weight',
          type: 'number',
        },
        {
          title: 'BMI',
          name: 'bmi',
          type: 'number',
          validation: (Rule) => Rule.precision(2),
        },
        {
          title: 'Muscle percentage',
          name: 'muscle_percentage',
          type: 'number',
        },
        {
          title: 'Body fat percentage',
          name: 'body_fat_percentage',
          type: 'number',
        },
        {
          title: 'Bone percentage',
          name: 'bone_percentage',
          type: 'number',
        },
      ]
    }
  ]
}
