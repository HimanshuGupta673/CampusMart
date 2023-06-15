import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (!login) {
        setTimeout(() => {
          navigate('/login');
        }, 200);
    } 
    
  }, [navigate]);

  return (
    <>
      <div>
        <Component />
      </div>
    </>
  );
}

export default ProtectRoute;
