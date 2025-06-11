
export const getContent = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    else {
      throw response.json();
    }
  }
  catch (error) {
    console.warn(error);
  }
}