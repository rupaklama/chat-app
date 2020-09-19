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