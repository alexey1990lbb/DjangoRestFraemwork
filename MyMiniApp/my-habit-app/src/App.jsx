import React, {useState, useEffect} from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/habits/';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  // все привычки
  const fetchHabits = async () => {
    try {
      const response = await axios.get(API_URL);
      setHabits(response.data);
    } catch (error) {
      console.error('Ошибка загрузки привычек:', error);
    }
  };

  // добавить привычку
  const addHabit = async () => {
    if (!newHabitTitle.trim()) {
      alert('Введите название привычки');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        title: newHabitTitle,
        description: newHabitDescription || ''
      });

      setHabits([...habits, response.data]);
      setNewHabitTitle('');
      setNewHabitDescription('');
    } catch (error) {
      console.error('Ошибка добавления привычки:', error);
      alert('Не удалось добавить привычку');
    }
  };

  // переключение статуса привычки
  const toggleHabit = async (id, currentStatus) => {
    try {
      const response = await axios.post(`${API_URL}${id}/toggle/`);

      setHabits(habits.map(habit =>
        habit.id === id ? response.data : habit
      ));
    } catch (error) {
      console.error('Ошибка переключения статуса:', error);
      alert('Не удалось изменить статус');
    }
  };

  // удаление привычки
  const deleteHabit = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить привычку?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}${id}/`);

      // удаляем из локального состояния
      setHabits(habits.filter(habit => habit.id !== id));
    } catch (error) {
      console.error('Ошибка удаления привычки:', error);
      alert('Не удалось удалить привычку');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Мои привычки</h1>

      {/* форма добавления */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Название привычки"
          value={newHabitTitle}
          onChange={(e) => setNewHabitTitle(e.target.value)}
          style={{ padding: '8px', flex: 2 }}
        />
        <input
          type="text"
          placeholder="Описание (необязательно)"
          value={newHabitDescription}
          onChange={(e) => setNewHabitDescription(e.target.value)}
          style={{ padding: '10px', flex: 3 }}
        />
        <button
          onClick={addHabit}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Добавить
        </button>
      </div>

      {/* список привычек */}
      <div>
        {habits.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>
            Нет привычек. Добавьте первую!
          </p>
        ) : (
          habits.map(habit => (
            <div key={habit.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: habit.is_completed ? '#f0f9f0' : 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{habit.title}</h3>
                  {habit.description && (
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                      {habit.description}
                    </p>
                  )}
                  <small style={{ color: '#999' }}>
                    Создано: {new Date(habit.created_at).toLocaleDateString()}
                  </small>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => toggleHabit(habit.id, habit.is_completed)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: habit.is_completed ? '#4CAF50' : '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      minWidth: '40px'
                    }}
                  >
                    {habit.is_completed ? '✅' : '○'}
                  </button>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App
