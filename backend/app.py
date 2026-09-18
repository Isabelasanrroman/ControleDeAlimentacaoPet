from flask import Flask, jsonify
from flask_cors import CORS
import mqtt
from mqtt import iniciar_mqtt, enviar_comando
from database import criar_tabelas, salvar_alimentacao, buscar_alimentacoes
from datetime import datetime


app = Flask(__name__)

CORS(app)


@app.route("/")
def inicio():

    return "Sistema de Controle de Alimentacao Pet"


@app.route("/liberar", methods=["POST"])
def liberar():

    enviar_comando("liberar")

    agora = datetime.now()

    data = agora.strftime("%d/%m/%Y")
    hora = agora.strftime("%H:%M:%S")

    salvar_alimentacao(data, hora)

    return jsonify({
        "mensagem": "Alimentacao liberada",
        "data": data,
        "hora": hora
    })


@app.route("/recusar", methods=["POST"])
def recusar():

    enviar_comando("recusar")

    return jsonify({
        "mensagem": "Alimentacao recusada"
    })


@app.route("/pet", methods=["GET"])
def verificar_pet():

    estado = mqtt.consultar_pet()

    return jsonify({
        "pet_detectado": estado
    })


@app.route("/historico", methods=["GET"])
def historico():

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

    criar_tabelas()

    iniciar_mqtt()

    app.run(debug=False)