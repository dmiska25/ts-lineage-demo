import axios from 'axios';

(async () => {
  const res = await axios.get('http://localhost:3000/user/1');
  console.log('API Response:', res.data);
})();
