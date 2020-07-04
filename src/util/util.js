export function transformToComponentFormat(data) {
  return data.map(function (item) {
    return {
      id: item.userId || undefined,
      title: item.title + ' ' + item.firstName || '' + ' ' + item.lastName || '',
      description: item.address || '',
      avatar: item.picture || undefined,
    };
  })
}