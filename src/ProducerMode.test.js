const nonActionNotesByType = (notes, filter) => notes.filter(note => note.type === filter && !note.action);

const sortByTimeAndParentDesc = (note1, note2) => {
  if (!note2.parentId && note2.id === note1.parentId) {
    return 1;
  } else {
    return note2.timeStart - note1.timeStart;
  }
};

const unsortedNotes = [
  {
    "type": "producer",
    "id": "6e5ec5a8-aa23-4595-897f-1686a58b5805",
    "timeStart": 1.480048,
    "timeEnd": 2.505262,
    "note": "note 1"
  },
  {
    "type": "producer",
    "id": "73631ae1-266f-4fa3-a62d-c2e30aa7dcd8",
    "timeStart": 2.792323,
    "timeEnd": 3.489354,
    "note": "note 2"
  },
  {
    "type": "producer",
    "id": "6d1fed21-eda7-4a00-a4c9-b552a8a33373",
    "parentId": "73631ae1-266f-4fa3-a62d-c2e30aa7dcd8",
    "timeStart": 3.899364,
    "timeEnd": 6.277216,
    "note": "- note 2 subnote 1"
  },
  {
    "type": "producer",
    "id": "930fedc9-5ef5-4548-8042-fa7c916da51e",
    "parentId": "73631ae1-266f-4fa3-a62d-c2e30aa7dcd8",
    "timeStart": 6.728576,
    "timeEnd": 9.024511,
    "note": "- note 2 subnote 2"
  },
  {
    "type": "producer",
    "id": "194cb2b8-13dc-4e96-98e2-9b8465e132ad",
    "timeStart": 11.156309,
    "timeEnd": 12.058854,
    "note": "note 3"
  }
];

const sortedNotes = [
  {
    "type": "producer",
    "id": "194cb2b8-13dc-4e96-98e2-9b8465e132ad",
    "timeStart": 11.156309,
    "timeEnd": 12.058854,
    "note": "note 3"
  },
  {
    "type": "producer",
    "id": "73631ae1-266f-4fa3-a62d-c2e30aa7dcd8",
    "timeStart": 2.792323,
    "timeEnd": 3.489354,
    "note": "note 2"
  },
  {
    "type": "producer",
    "id": "930fedc9-5ef5-4548-8042-fa7c916da51e",
    "parentId": "73631ae1-266f-4fa3-a62d-c2e30aa7dcd8",
    "timeStart": 6.728576,
    "timeEnd": 9.024511,
    "note": "- note 2 subnote 2"
  },
  {
    "type": "producer",
    "id": "6d1fed21-eda7-4a00-a4c9-b552a8a33373",
    "parentId": "73631ae1-266f-4fa3-a62d-c2e30aa7dcd8",
    "timeStart": 3.899364,
    "timeEnd": 6.277216,
    "note": "- note 2 subnote 1"
  },
  {
    "type": "producer",
    "id": "6e5ec5a8-aa23-4595-897f-1686a58b5805",
    "timeStart": 1.480048,
    "timeEnd": 2.505262,
    "note": "note 1"
  }
];

it('Sorts nested notes lists', () => {
  expect(
    Array.from(nonActionNotesByType(unsortedNotes, 'producer')).sort(sortByTimeAndParentDesc)
  ).toEqual(sortedNotes);
});
