import asyncio
import motor.motor_asyncio

async def show_colabs():
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['techsolutions_treinamentos']
    colabs = await db.colaboradores.find().to_list(100)
    for c in colabs:
        print(c.get('email', 'SEM EMAIL'), '|', c.get('nome', 'SEM NOME'))

if __name__ == '__main__':
    asyncio.run(show_colabs())
