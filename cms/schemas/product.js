export default {
  title: 'Producto',
  name: 'product',
  type: 'document',
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Imagen',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Descripción',
      name: 'description',
      type: 'string'
    },
    {
      title: 'Precio',
      name: 'price',
      type: 'number'
    },
    {
      title: 'Cantidad',
      name: 'quantity',
      type: 'number'
    },
  ]
}
