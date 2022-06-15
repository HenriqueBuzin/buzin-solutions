FROM python:3.10.5-slim-buster

WORKDIR /buzin_solutions_pyhon

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

WORKDIR /buzin_solutions_python/src

CMD ["python3", "main.py"]
