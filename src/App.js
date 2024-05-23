import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cohortName, setCohortName] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [csvUrl, setCsvUrl] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cohort_name: cohortName,
      campaign_name: campaignName,
      csv_url: csvUrl,
      title,
      body,
      url,
    };

    try {
      const response = await axios.post('http://localhost:5002/api/notify', payload);
      alert(`Notification sent: ${response.data.message}`);
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <div className="App">
      <h1>Firebase Notifier</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Cohort Name" value={cohortName} onChange={(e) => setCohortName(e.target.value)} required />
        <input type="text" placeholder="Campaign Name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} required />
        <input type="text" placeholder="CSV URL" value={csvUrl} onChange={(e) => setCsvUrl(e.target.value)} required />
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
        <input type="text" placeholder="URL (optional)" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
}

export default App;
