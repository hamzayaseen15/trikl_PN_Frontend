import React, { useState } from 'react';
import { sendNotifications } from '../api';
import '../styles/NotificationForm.css'
import Loader from './Loader'; 

const NotificationForm = () => {
  const [csvUrl, setCsvUrl] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const campaign = {
      title,
      body,
    };

    try {
      const response = await sendNotifications(csvUrl, campaign);
      setResult(response.data);
    } catch (error) {
      setResult({ message: 'Error sending notifications', error: error.message });
    }finally {
        setLoading(false);
      }
  };

  return (
    <div className="container">
      <h2>Trikl Push Notifications</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="csvUrl">CSV URL:</label>
          <input
            id="csvUrl"
            type="text"
            value={csvUrl}
            onChange={(e) => setCsvUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <input
            id="body"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Send'}
        </button>
      </form>
      {result && (
        <div className="result">
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NotificationForm;
