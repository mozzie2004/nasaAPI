export const getData = async (query) => {
  const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  const apiKey = 'AGOBNHkpaWCf8zMqC3rdKKNggLmz0hHDI25vtl8v';
  const response = await fetch(`${baseUrl}${query}&size=10&api_key=${apiKey}`);

  if (!response.ok) {
    throw new Error('error fetching data');
  }

  return await response.json();
};
