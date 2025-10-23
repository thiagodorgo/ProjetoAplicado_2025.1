import asyncio
import motor.motor_asyncio

async def fix_perfil_admin():
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['techsolutions_treinamentos']
    await db.perfis.update_one(
        {'id_perfil': 1},
        {'$set': {'nome': 'Administrador', 'permissoes': ['admin']}},
        upsert=True
    )
    print('Perfil de id_perfil=1 corrigido para permissoes [admin]!')

if __name__ == '__main__':
    asyncio.run(fix_perfil_admin())
