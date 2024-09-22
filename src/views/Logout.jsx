import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Logging out...');
//    localStorage.removeItem('users'); 
    navigate('/');
  }, [navigate]);

  return (
  <div>Logging out...</div>
  )
}
