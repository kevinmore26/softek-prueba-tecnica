const API_URL = 'https://rimac-front-end-challenge.netlify.app/api';
//Aquí debería usar un .env pero por ser un reto, quiero que se vea la url 
export const getUserData = async () => {
  const response = await fetch(`${API_URL}/user.json`);
  return await response.json();
};

export const getPlansData = async () => {
  const response = await fetch(`${API_URL}/plans.json`);
  return await response.json();
};
