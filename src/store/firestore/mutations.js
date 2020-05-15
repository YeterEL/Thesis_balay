// retrieve houses
export function retrieveHouses (state, payload) {
  state.houses = payload
}

// retrieve single house
export function retrieveSingleHouse (state, payload) {
  state.singleHouse = payload
}

// retrieve single house available rooms
export function retrieveAvailableRoom (state, payload) {
  state.available_room = payload
}

// retrieve single house number of boarders
export function retrieveHouseBoarders (state, payload) {
  state.numberOfBoarders = payload
}

// retrieve single house vacancy
export function retrieveVacancy (state, payload) {
  state.vacancy = payload
}

// retrieve single house paid boarders
export function retrievePaidBoarders (state, payload) {
  state.paidBoarders = payload
}

// retrieve single house available rooms
export function retrieveHouseId (state, payload) {
  state.houseId = payload
}

// retrieve single house available rooms
export function retrieveDueDate (state, payload) {
  state.due_date = payload
}

export const setDueDate = (state, date) => {
  state.due_date = date
}

export const setBoarders = (state, payload) => {
  state.boarders = payload
}

// add house
export function addHouse (state, payload) {
  state.houses.push({
    user_id: payload.user_id,
    id: payload.id,
    house_name: payload.house_name,
    address: payload.address,
    near: payload.near,
    distance: payload.distance,
    contact_number1: payload.contact_number1,
    contact_number2: payload.contact_number2,
    details: payload.details,
    price_max: payload.price_max,
    price_min: payload.price_min,
    available_room: payload.available_room,
    boarders: payload.boarders,
    paid_boarders: payload.paid_boarders,
    vacancy: payload.vacancy,
    wifi: payload.wifi,
    uploadedBy: payload.uploadedBy,
    images: payload.images
  })
}

// add house image
export function addImage (state, payload) {
  state.house_images.push({
    id: payload.id,
    image_url: payload.image_url
  })
}

// add google map image
export function addGoogleMap (state, payload) {
  state.house_googlemap.push({
    id: payload.id,
    image_url: payload.image_url
  })
}

// retrieve house images
export function retrieveHouseImages (state, payload) {
  state.house_images = payload
}

// retrieve house images
export function retrieveGoogleImages (state, payload) {
  state.house_googlemap = payload
}

// update house
export function updateHouse (state, payload) {
  state.houses.push({
    id: payload.id,
    house_name: payload.house_name,
    address: payload.address,
    near: payload.near,
    distance: payload.distance,
    details: payload.details,
    price_max: payload.price_max,
    price_min: payload.price_min,
    available_room: payload.available_room,
    vacancy: payload.vacancy,
    wifi: payload.wifi
  })
}

// add boarder
export function addBoarder (state, payload) {
  state.boarders.push({
    id: payload.id,
    owner_id: payload.owner_id,
    full_name: payload.full_name,
    address: payload.address,
    phone: payload.phone,
    rent: payload.rent,
    room: payload.room,
    balance: payload.balance,
    status: payload.status
  })
}

// retrieve user Id
export function retrieveUserId (state, payload) {
  state.userId = payload
}

// retrieve Boarders
export function retrieveBoarders (state, payload) {
  state.boarders = payload
}

// update boarders
export function updateBoarders (state, payload) {
  const index = state.boarders.findIndex((item) => item.id === payload.id)
  state.houses.splice(index, 1, {
    'owner_id': payload.owner_id,
    'full_name': payload.full_name,
    'address': payload.address,
    'phone': payload.phone,
    'rent': payload.rent,
    'room': payload.room,
    'balance': payload.balance,
    'status': payload.status
  })
}

// retrieve single boarder
export function retrieveSingleBoarder (state, payload) {
  state.singleBoarder = payload
}
