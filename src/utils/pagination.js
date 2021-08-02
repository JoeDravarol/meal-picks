// https://joshgoestoflatiron.medium.com/february-10-pagination-in-a-json-server-api-with-the-link-header-dea63eb0a835
const parseLinkHeader = linkHeader => {
  const linkHeadersArray = linkHeader
    .split(', ')
    .map(header => header.split('; '));
  const linkHeadersMap = linkHeadersArray.map(header => {
    const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '');
    const thisHeaderUrl = header[0].slice(1, -1);
    return [thisHeaderRel, thisHeaderUrl];
  });
  return Object.fromEntries(linkHeadersMap);
};

export const totalPageCount = linkHeader => {
  const linkHeadersArray = parseLinkHeader(linkHeader);
  const lastPage = Number(linkHeadersArray.last.split('_page=')[1]);
  return lastPage;
};
