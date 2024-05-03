# Purpose 
An app that helps connect communities by assisting in event creation and advertisement

# Requirements
Python and NodeJS installed and added to path

1. Download requirements for python from backend/backend/requirements.txt (also install below Gemini req)
```bash
pip install google-generativeai
```

3. Download requirements for NodeJS as shown below. 

```bash
cd frontend/
npm install axios react-router-dom jwt-decode
npm install react-datepicker
```

# How to Run it
Activate Server:
```bash
cd backend/
python manage.py runserver
```

Activate Website:
```bash
cd frontend/
npm run dev
```

Created a .env file with the google api key:
```env
GOOGLE_API_KEY="" # your key for gemini
```


# Common Webpages
http://localhost:5173/register
http://localhost:5173/login
http://localhost:5173/logout
