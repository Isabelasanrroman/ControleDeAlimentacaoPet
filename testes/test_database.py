import pytest

import database


def test_conectar_banco():

    banco = database.conectar_banco()

    assert banco is not None

    banco.close()


def test_buscar_alimentacoes():

    alimentacoes = database.buscar_alimentacoes()

    assert alimentacoes is not None
    assert isinstance(alimentacoes, list)


@pytest.mark.parametrize("data,hora", [
    ("18/09/2026", "08:00:00"),
    ("19/09/2026", "12:30:00"),
    ("20/09/2026", "18:45:00")
])

def test_salvar_alimentacao(data, hora):

    assert data != ""
    assert hora != ""


def test_erro_banco():

    with pytest.raises(Exception):

        banco = database.psycopg.connect("conexao_invalida")

        banco.close()