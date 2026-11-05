
import os
import psycopg

from datetime import datetime
from zoneinfo import ZoneInfo
from dotenv import load_dotenv


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

FUSO_HORARIO = ZoneInfo("America/Sao_Paulo")


def conectar_banco():

    banco = psycopg.connect(DATABASE_URL)

    return banco


def criar_tabelas():

    banco = conectar_banco()

    cursor = banco.cursor()

    try:

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS alimentacoes (
                id SERIAL PRIMARY KEY,
                data TEXT NOT NULL,
                hora TEXT NOT NULL,
                momento TIMESTAMP WITH TIME ZONE
            )
        """)

        cursor.execute("""
            ALTER TABLE alimentacoes
            ADD COLUMN IF NOT EXISTS momento TIMESTAMP WITH TIME ZONE
        """)

        # Recupera os registros antigos que ainda não possuem momento.

        cursor.execute("""
            SELECT id, data, hora
            FROM alimentacoes
            WHERE momento IS NULL
        """)

        registros_antigos = cursor.fetchall()

        for registro in registros_antigos:

            id_alimentacao = registro[0]
            data = registro[1]
            hora = registro[2]

            instante = datetime.strptime(
                data + " " + hora,
                "%d/%m/%Y %H:%M:%S"
            )

            instante = instante.replace(
                tzinfo=FUSO_HORARIO
            )

            cursor.execute("""
                UPDATE alimentacoes
                SET momento = %s
                WHERE id = %s
            """, (instante, id_alimentacao))

        banco.commit()

    except Exception:

        banco.rollback()

        raise

    finally:

        cursor.close()
        banco.close()


def salvar_alimentacao():

    banco = conectar_banco()

    cursor = banco.cursor()

    agora = datetime.now(FUSO_HORARIO)

    data = agora.strftime("%d/%m/%Y")
    hora = agora.strftime("%H:%M:%S")

    try:

        cursor.execute("""
            INSERT INTO alimentacoes (data, hora, momento)
            VALUES (%s, %s, %s)
            RETURNING id
        """, (data, hora, agora))

        id_alimentacao = cursor.fetchone()[0]

        banco.commit()

        return {
            "id": id_alimentacao,
            "data": data,
            "hora": hora
        }

    except Exception:

        banco.rollback()

        raise

    finally:

        cursor.close()
        banco.close()


def verificar_intervalo():

    banco = conectar_banco()

    cursor = banco.cursor()

    try:

        cursor.execute("""
            SELECT
                momento,
                EXTRACT(
                    EPOCH FROM (CURRENT_TIMESTAMP - momento)
                )::BIGINT
            FROM alimentacoes
            WHERE momento IS NOT NULL
            ORDER BY momento DESC
            LIMIT 1
        """)

        ultima = cursor.fetchone()

        if ultima is None:

            return {
                "autorizado": True,
                "data": None,
                "hora": None,
                "segundos_restantes": 0
            }

        momento = ultima[0]

        segundos_decorridos = max(0, ultima[1])

        tres_horas = 3 * 60 * 60

        segundos_restantes = max(
            0,
            tres_horas - segundos_decorridos
        )

        ultima_local = momento.astimezone(FUSO_HORARIO)

        return {
            "autorizado": segundos_decorridos >= tres_horas,
            "data": ultima_local.strftime("%d/%m/%Y"),
            "hora": ultima_local.strftime("%H:%M:%S"),
            "segundos_restantes": segundos_restantes
        }

    finally:

        cursor.close()
        banco.close()


def buscar_alimentacoes():

    banco = conectar_banco()

    cursor = banco.cursor()

    try:

        cursor.execute("""
            SELECT id, data, hora
            FROM alimentacoes
            ORDER BY momento DESC NULLS LAST, id DESC
        """)

        alimentacoes = cursor.fetchall()

        return alimentacoes

    finally:

        cursor.close()
        banco.close()
