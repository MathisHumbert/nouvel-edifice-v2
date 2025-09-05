import {singletonDocumentListItems, filteredDocumentListItems} from 'sanity-plugin-singleton-tools'

export const structure = (S, context) => {
  return S.list()
    .title('Nouvel Ediffice')
    .items([
      ...singletonDocumentListItems({S, context}),
      ...filteredDocumentListItems({S, context}).filter((item) => item.getId() !== 'media.tag'),
    ])
}
