import pytest

import app
import mqtt


def test_inicio():

    cliente = app.app.test_client()

    resposta = cliente.get("/")

    assert resposta.status_code == 200
    assert resposta.data.decode() == "Sistema de Controle de Alimentacao Pet"


def test_pet_detectado():

    app.mqtt.consultar_pet = lambda: True

    cliente = app.app.test_client()

    resposta = cliente.get("/pet")

    dados = resposta.get_json()

    assert resposta.status_code == 200
    assert dados["pet_detectado"] == True

def test_pet_nao_detectado():

    app.mqtt.consultar_pet = lambda: False

    cliente = app.app.test_client()

    resposta = cliente.get("/pet")

    dados = resposta.get_json()

    assert resposta.status_code == 200
    assert dados["pet_detectado"] == False


def test_recusar():

    app.enviar_comando = lambda comando: None

    cliente = app.app.test_client()

    resposta = cliente.post("/recusar")

    dados = resposta.get_json()

    assert resposta.status_code == 200
    assert dados["mensagem"] == "Alimentacao recusada"


def test_historico():

    app.buscar_alimentacoes = lambda: [
        (1, "18/09/2026", "07:30:00")
    ]

    cliente = app.app.test_client()

    resposta = cliente.get("/historico")

    dados = resposta.get_json()

    assert resposta.status_code == 200
    assert dados[0]["id"] == 1
    assert dados[0]["data"] == "18/09/2026"
    assert dados[0]["hora"] == "07:30:00"


@pytest.mark.parametrize("comando", [
    "liberar",
    "recusar"
])

def test_comandos(comando):

    assert comando in ["liberar", "recusar"]


def test_erro_divisao():

    with pytest.raises(ZeroDivisionError):

        numero = 10 / 0