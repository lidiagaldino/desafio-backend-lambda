export function updateOrAddItem(catalog, newItem){
  const index = catalog.findIndex(item => item.id === newItem.id)
  if(index !== -1){
    catalog[index] = {...catalog[index], ...newItem}
  } else {
    catalog.push(newItem)
  }
}
