export const create = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
  },
  required: [
    'name',
    'description',
  ]
}
  
export const deleteApp = {
  type: 'object',
  properties: {
    appId: { type: 'string' }
  },
  required: ['appId']
}
  
export const patch = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
  },
  required: [
      'name',
      'description',
    ]
}