import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {singletonTools} from 'sanity-plugin-singleton-tools'
import {media} from 'sanity-plugin-media'

import {structure} from './structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Nouvel Edifice',

  projectId: 'i3cs0xuf',
  dataset: 'production',

  plugins: [structureTool({structure}), singletonTools(), media()],

  schema: {
    types: schemaTypes,
  },
})
