import {TiersIcon} from '@sanity/icons'
export default {
  name: 'homePage',
  title: "Page d'accueil",
  type: 'document',
  options: {
    singleton: true,
  },
  groups: [
    {
      name: 'hero',
      title: 'Héro',
      icon: TiersIcon,
    },
    {
      name: 'manifesto',
      title: 'Manifeste',
      icon: TiersIcon,
    },
    {
      name: 'achievements',
      title: 'Réalisations',
      icon: TiersIcon,
    },
    {
      name: 'investment',
      title: 'Dispositifs',
      icon: TiersIcon,
    },
    {
      name: 'expertise',
      title: 'Savoir-Faire',
      icon: TiersIcon,
    },
    {
      name: 'about',
      title: 'Qui sommes-nous',
      icon: TiersIcon,
    },
    {
      name: 'footer',
      title: 'Contact',
      icon: TiersIcon,
    },
  ],
  fields: [
    {
      name: 'hero',
      group: 'hero',
      title: 'Héro',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
      ],
    },
    {
      name: 'manifesto',
      group: 'manifesto',
      title: 'Manifeste',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'items',
          title: "Liste d'éléments",
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Titre',
                  type: 'string',
                },
                {
                  name: 'subtitle',
                  title: 'Sous-titre',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Texte alternatif',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'achievements',
      group: 'achievements',
      title: 'Réalisations',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'items',
          title: "Liste d'éléments",
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Titre',
                  type: 'string',
                },
                {
                  name: 'nouveau',
                  title: 'Nouveau',
                  type: 'boolean',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'array',
                  of: [
                    {
                      type: 'block',
                      styles: [{title: 'Normal', value: 'normal'}],
                      marks: {
                        decorators: [
                          {title: 'Gras', value: 'strong'},
                          {title: 'Underline', value: 'underline'},
                        ],
                        annotations: [],
                      },
                      lists: [
                        {title: 'Bullet', value: 'bullet'},
                        {title: 'Number', value: 'number'},
                      ],
                    },
                  ],
                },
                {
                  name: 'images',
                  title: 'Images',
                  type: 'array',
                  of: [
                    {
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      fields: [
                        {
                          name: 'alt',
                          title: 'Texte alternatif',
                          type: 'string',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'investment',
      group: 'investment',
      title: 'Dispositifs',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre principal',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'subtitle',
          title: 'Sous Titre',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'items',
          title: "Liste d'éléments",
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Titre principal',
                  type: 'array',
                  of: [
                    {
                      type: 'block',
                      styles: [{title: 'Normal', value: 'normal'}],
                      marks: {
                        decorators: [
                          {title: 'Gras', value: 'strong'},
                          {title: 'Underline', value: 'underline'},
                        ],
                        annotations: [],
                      },
                      lists: [],
                    },
                  ],
                  validation: (Rule) => Rule.max(1),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                },
                {
                  name: 'subItems',
                  title: 'Sous-éléments',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'title',
                          title: 'Titre',
                          type: 'string',
                        },
                        {
                          name: 'description',
                          title: 'Description',
                          type: 'array',
                          of: [
                            {
                              type: 'block',
                              styles: [{title: 'Normal', value: 'normal'}],
                              marks: {
                                decorators: [{title: 'Gras', value: 'strong'}],
                                annotations: [],
                              },
                              lists: [
                                {title: 'Bullet', value: 'bullet'},
                                {title: 'Number', value: 'number'},
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'expertise',
      group: 'expertise',
      title: 'Savoir-Faire',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'subtitle',
          title: 'Sous Titre',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'items',
          title: "Liste d'éléments",
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Titre',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                },
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Texte alternatif',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      group: 'about',
      title: 'Qui sommes-nous',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre principal',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Underline', value: 'underline'},
                ],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'leftBlock',
          title: 'Bloc gauche',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'array',
                  of: [
                    {
                      type: 'block',
                      styles: [{title: 'Normal', value: 'normal'}],
                      marks: {
                        decorators: [{title: 'Gras', value: 'strong'}],
                        annotations: [],
                      },
                      lists: [],
                    },
                  ],
                  validation: (Rule) => Rule.max(1),
                },
              ],
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  marks: {
                    decorators: [{title: 'Gras', value: 'strong'}],
                    annotations: [],
                  },
                },
              ],
            },
            {
              name: 'quote',
              title: 'Citation',
              type: 'text',
            },
          ],
        },
        {
          name: 'rightBlock',
          title: 'Bloc droite',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'items',
              title: "Liste d'éléments",
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'number',
                      title: 'Chiffre',
                      type: 'string',
                    },
                    {
                      name: 'text',
                      title: 'Texte',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      group: 'footer',
      title: 'Contact',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              marks: {
                decorators: [{title: 'Gras', value: 'strong'}],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.max(1),
        },
        {
          name: 'tel',
          title: 'Téléphone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
      ],
    },
  ],
}
