
from flask import Flask, jsonify
from flask_cors import CORS

import mqtt

from database import (
    criar_tabelas,
    salvar_alimentacao,
    buscar_alimentacoes,
    verificar_intervalo
)


app = Flask(__name__)

CORS(app)


# Evita executar a migração em todas as requisições
# durante a mesma execução do backend.

banco_inicializado = False


def preparar_banco():

    global banco_inicializado

    if not banco_inicializado:

        criar_tabelas()

        banco_inicializado = True


@app.after_request
def evitar_cache(resposta):

    resposta.headers["Cache-Control"] = "no-store"

    return resposta


@app.route("/")
def inicio():

    return "Sistema de Controle de Alimentacao Pet"


# CONSULTAR SE PODE ALIMENTAR

@app.route("/pode-alimentar", methods=["GET"])
def pode_alimentar():

    preparar_banco()

    resultado = verificar_intervalo()

    return jsonify(resultado)


# REGISTRAR ALIMENTAÇÃO

@app.route("/registrar-alimentacao", methods=["POST"])
def registrar_alimentacao():

    preparar_banco()

    # Confere novamente o intervalo antes de registrar.

    verificacao = verificar_intervalo()

    if not verificacao["autorizado"]:

        return jsonify({
            "mensagem": "Alimentacao bloqueada.",
            "autorizado": False,
            "segundos_restantes": verificacao["segundos_restantes"]
        }), 429

    alimentacao = salvar_alimentacao()

    return jsonify({
        "mensagem": "Alimentacao registrada com sucesso.",
        "id": alimentacao["id"],
        "data": alimentacao["data"],
        "hora": alimentacao["hora"]
    })


# VERIFICAR SE O PET ESTÁ PERTO

@app.route("/pet", methods=["GET"])
def verificar_pet():

    estado = mqtt.consultar_pet()

    return jsonify({
        "pet_detectado": estado
    })


# HISTÓRICO DE ALIMENTAÇÕES

@app.route("/historico", methods=["GET"])
def historico():

    preparar_banco()

    alimentacoes = buscar_alimentacoes()

    resultado = []

    for alimentacao in alimentacoes:

        resultado.append({
            "id": alimentacao[0],
            "data": alimentacao[1],
            "hora": alimentacao[2]
        })

    return jsonify(resultado)


if __name__ == "__main__":

    preparar_banco()

    mqtt.iniciar_mqtt()

    app.run(debug=False)
