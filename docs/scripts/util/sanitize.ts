/**
 * @name sanitize
 * @description treat special characters
 * 1) "|", "<", ">", "`" => replace with character code, "&$<unicode>;"
 * 2) "' + '" => replace with space
 * 3) "\n" => replace with space
 */
export function sanitize(string) {
  const tobeEncoded = new RegExp(/[|<>`]|'\s\+\s'|\\n|\n/g);
  const getEncoded = (match) =>
    match.match(/[|<>`]/) ? `&#${match.charCodeAt()};` : ' ';

  return string.replaceAll(tobeEncoded, getEncoded);
}
