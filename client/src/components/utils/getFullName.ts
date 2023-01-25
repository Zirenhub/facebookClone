function getFullName(firstName: string, lastName: string) {
  return `
  ${firstName[0].toUpperCase()}${firstName.substring(1, firstName.length)}
  ${lastName[0].toUpperCase()}${lastName.substring(1, lastName.length)}
  `;
}

export default getFullName;
