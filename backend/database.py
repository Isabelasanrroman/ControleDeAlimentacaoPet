import os
import psycopg
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


def conectar_banco():

    banco = psycopg.connect(DATABASE_URL)

    return banco


def criar_tabelas():

    banco = conectar_banco()

    cursor = banco.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS alimentacoes (
            id SERIAL PRIMARY KEY,
            data TEXT NOT NULL,
            hora TEXT NOT NULL
        )
    """)

    banco.commit()

    cursor.close()
    banco.close()


def salvar_alimentacao(data, hora):

    banco = conectar_banco()

    cursor = banco.cursor()

    cursor.execute("""
        INSERT INTO alimentacoes (data, hora)
        VALUES (%s, %s)
    """, (data, hora))

    banco.commit()

    cursor.close()
    banco.close()


def buscar_alimentacoes():

    banco = conectar_banco()

    cursor = banco.cursor()

    cursor.execute("""
        SELECT id, data, hora
        FROM alimentacoes
        ORDER BY id DESC
    """)

    alimentacoes = cursor.fetchall()

    cursor.close()
    banco.close()

    return alimentacoes