export const getDestinationListFullPrefix = (
  destinationList: string[]
): string => {
  if (
    destinationList.length < 1 ||
    (destinationList.length === 1 && destinationList[0] === '')
  )
    return '';
  // filter out root bucket ""
  const destination = destinationList.filter((item) => item !== '').join('/');
  return destination.endsWith('/') ? destination : `${destination}/`;
};
