import axios from 'axios';

const fetchCompanies = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/companies/');
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке списка компаний:", error);
    return [];
  }
};

export default fetchCompanies;