import React, { useState } from 'react';
import axios from 'axios';

export default function RegistrationUploader({ onSuccess }){
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    university: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic local validation
    if (!values.name || !values.email || !values.university || !values.phone || !values.cnic) {
      alert('Please fill all fields.');
      return;
    }
    if (!file) {
      alert('Please attach your university card image/file.');
      return;
    }

    const fd = new FormData();
    fd.append('name', values.name);
    fd.append('email', values.email);
    fd.append('phone', values.phone);
    fd.append('cnic', values.cnic);
    fd.append('university', values.university);
    fd.append('university_card_picture', file);

    try {
      setLoading(true);
      // Do NOT set Content-Type header; let browser set the multipart boundary
      const res = await axios.post('http://127.0.0.1:5000/register', fd, { timeout: 20000 });
      console.log('register response', res);
      if (res?.data?.message) {
        alert(res.data.message);
      } else {
        alert('Registration successful');
      }
      setValues({ name: '', email: '', phone: '', cnic: '', university: '' });
      setFile(null);
      onSuccess?.(res?.data);
    } catch (err) {
      console.error('upload error', err);
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert('Failed to submit — check backend/CORS and network.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={values.name} onChange={handleChange} placeholder="Full name" />
      <input name="email" value={values.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={values.phone} onChange={handleChange} placeholder="Phone" />
      <input name="cnic" value={values.cnic} onChange={handleChange} placeholder="CNIC" />
      <input name="university" value={values.university} onChange={handleChange} placeholder="University" />
      <div>
        <input id="uni-card-input" type="file" accept="image/*,.pdf" onChange={handleFile} />
        {file && <div className="text-sm">Selected: {file.name}</div>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Upload & Register'}
      </button>
    </form>
  );
}