// here we will define all the reusable helper functions for our code

// to get user initials
export function getNameInitials(name) {
  // first, splitting into array of words, then
  // will check if we have two or more words in our nickname,
  // after that we will get first letter of first two words in our nickname

  // will end up with an array of words
  // toUpperCase - convert the string to uppercase letters 
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    // first word with first letter of that word
    // second word with first letter of that word
    return splitName[0][0] + splitName[1][0];
  }
  
  // incase if we have one word in our nick name
  return splitName[0][0]

}

// transforming db objects into an array so that
// we can loop & access each properties 
// When calling Object.keys it returns a array of the object's keys

// Logic is to call Object.keys() to put all rooms id (chat data id)
// into an array & map on rooms id to access data
// Object.keys(snapValue)to get all keys as an array
export function transformToArrWithId(snapValue) {
  return snapValue ? Object.keys(snapValue).map(roomId => {
    // object that will be all data from our room, 
    // we can access with snapshot value of roomId
    // added another key to hold room id (object id)
    return {...snapValue[roomId], id: roomId}
  }) : []
}