import paho.mqtt.client as mqtt

BROKER = "broker.hivemq.com"
PORTA = 1883

TOPICO_PET = "controle-pet/isabela/pet"
TOPICO_COMANDO = "controle-pet/isabela/comando"

pet_detectado = False


def ao_conectar(cliente, dados, flags, codigo):

    print("Flask conectado ao MQTT!")

    cliente.subscribe(TOPICO_PET)

    print("Escutando o topico:", TOPICO_PET)


def ao_receber_mensagem(cliente, dados, mensagem):

    global pet_detectado

    texto = mensagem.payload.decode()

    print("Mensagem recebida:", texto)

    if mensagem.topic == TOPICO_PET:

        if texto == "pet_detectado":

            pet_detectado = True

            print("PET DETECTADO PELO FLASK!")


        if texto == "pet_saiu":

            pet_detectado = False

            print("PET SAIU DA AREA!")

cliente_mqtt = mqtt.Client()

cliente_mqtt.on_connect = ao_conectar
cliente_mqtt.on_message = ao_receber_mensagem


def iniciar_mqtt():

    cliente_mqtt.connect(BROKER, PORTA)

    cliente_mqtt.loop_start()


def enviar_comando(comando):

    cliente = mqtt.Client()

    cliente.connect(BROKER, PORTA)

    cliente.publish(TOPICO_COMANDO, comando)

    cliente.disconnect()