import paho.mqtt.client as mqtt
import threading

BROKER = "broker.hivemq.com"
PORTA = 1883

TOPICO_PET = "controle-pet/isabela/pet"
TOPICO_COMANDO = "controle-pet/isabela/comando"

pet_detectado = False


def criar_cliente():
    cliente = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    return cliente


def consultar_pet():

    global pet_detectado

    estado = {
        "valor": False
    }

    mensagem_recebida = threading.Event()

    def receber_mensagem(cliente, dados, mensagem):

        texto = mensagem.payload.decode()

        print("Mensagem recebida:", texto)

        if mensagem.topic == TOPICO_PET:

            if texto == "pet_detectado":
                estado["valor"] = True

            if texto == "pet_saiu":
                estado["valor"] = False

            mensagem_recebida.set()

    cliente = criar_cliente()

    cliente.on_message = receber_mensagem

    cliente.connect(BROKER, PORTA, 10)

    cliente.subscribe(TOPICO_PET)

    cliente.loop_start()

    mensagem_recebida.wait(timeout=2)

    cliente.loop_stop()

    cliente.disconnect()

    pet_detectado = estado["valor"]

    return pet_detectado


def enviar_comando(comando):

    cliente = criar_cliente()

    cliente.connect(BROKER, PORTA, 10)

    cliente.loop_start()

    mensagem = cliente.publish(
        TOPICO_COMANDO,
        comando
    )

    mensagem.wait_for_publish()

    cliente.loop_stop()

    cliente.disconnect()

    print("Comando enviado:", comando)


def iniciar_mqtt():

    print("MQTT configurado para conexoes sob demanda.")