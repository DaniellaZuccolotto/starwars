async function ResquestAPI() {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    // console.log(data);
    return data.results;
  } catch (error) {
    return error;
  }
}

export default ResquestAPI;
