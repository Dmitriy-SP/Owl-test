import React from 'react';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <div className="text-center mt-5">Нет данных о пользователе</div>;
  }

  return (
    <div className="container">
      <h2>Профиль пользователя</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Имя:</strong> {user.firstname} {user.lastname}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Дата рождения:</strong> {user.birthday}</li>
        <li className="list-group-item"><strong>Пол:</strong> {user.gender}</li>
        <li className="list-group-item"><strong>Номер телефона:</strong> {user.phone}</li>
      </ul>
    </div>
  );
};

export default UserProfilePage;
