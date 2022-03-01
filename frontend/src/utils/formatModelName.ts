function capitalizeFirstLetter(word : string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Convert snake case to readable title
function formatModelName(modelName : string) : string {
  const nameArray = modelName.split('_').map( (word) => {
    return capitalizeFirstLetter(word);
  });
  return nameArray.join(' ');
}

export default formatModelName;
