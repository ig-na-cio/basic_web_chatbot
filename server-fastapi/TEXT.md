#### Virtual enviroment
python -m venv venv

source venv/bin/activate

#### Primeras instalaciones
pip install fastapi uvicorn

#### Actualizar el requirements
pip freeze > requirements.txt

#### Inicial el servidor
uvicorn app.main:app --reload

#### Usar el servidor
http://localhost:8000/

#### Documentación y pruebas
http://localhost:8000/docs