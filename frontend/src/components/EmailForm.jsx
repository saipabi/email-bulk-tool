import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [recipients, setRecipients] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailData = {
            subject,
            body,
            recipients: recipients.split(',')
        };

        try {
            await axios.post('http://localhost:5000/api/email/send', emailData);
            alert('Emails sent successfully');
        } catch (error) {
            console.error('Error sending emails', error);
            alert('Error sending emails');
        }
    };

    return (

        <div className="--flex-center --bg-primary --100vh">
        <div className="--width-500px --card --p --bg-light">
          <form className="--form-control" onSubmit={handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
            <div>
                <label>Subject:</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div>
                <label>Body:</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
            </div>
            <div>
                <label>Recipients (comma separated):</label>
                <input type="text" value={recipients} onChange={(e) => setRecipients(e.target.value)} required />
            </div>
            {/* <button type="submit">Send Emails</button> */}

            <button type="submit" className="--btn --btn-primary">
            Send Emails
          </button>
          </form>
      </div>
    </div>
    );
};

export default EmailForm;
