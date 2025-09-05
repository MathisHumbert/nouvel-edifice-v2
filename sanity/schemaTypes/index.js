import homePage from '../schemas/homePage'

const singletonTypes = ['homePage']

const schemaTypes = [homePage].map((schema) => {
  if (singletonTypes.includes(schema.name)) {
    return {
      ...schema,
    }
  }
  return schema
})

export {schemaTypes}
