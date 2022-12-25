npm install --omit=dev
python -m venv env
source env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip show spotdl
which spotdl