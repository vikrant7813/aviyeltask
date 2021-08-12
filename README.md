# Inoice Application

The application's frontend is based on ReactJS and backend is on Django. 

## Backend

The backend code is in `backend` directory. To run the project:

```bash
cd api
python3 -m virtualenv myenv         # Create Python3 virtual environment
source myenv/bin/activate           # Activate virtual environment

pip install -r requirements.txt     # Install project dependencies

python manage.py migrate            # This will create a sqlite db in the backend directory
python manage.py runserver          # Run server on port 8000
```
This will start the backend server on port 8000. 

## Frontend

The frontend code is in `frontend` directory. To run the project:
```bash
cd frontend           
npm install       # Install node modules
npm start         # This will start the react server on port 3000
```
Go to http://localhost:3000

For creating a production build
```bash
npm run build
```





