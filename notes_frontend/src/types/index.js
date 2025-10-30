 /**
  * PUBLIC_INTERFACE
  */
export const NoteShape = {
  /** Documentation-only shape for a Note object */
  id: 'string',
  title: 'string',
  content: 'string',
  tags: ['string'],
  pinned: 'boolean',
  archived: 'boolean',
  createdAt: 'number',
  updatedAt: 'number'
};
