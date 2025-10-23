import asyncio
import motor.motor_asyncio

async def fix_admin():
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['techsolutions_treinamentos']
    perfil = await db.perfis.find_one({'permissoes': {'$in': ['admin']}})
    if not perfil:
        # Cria perfil admin se não existir
        last = await db.perfis.find_one(sort=[('id_perfil', -1)])
        next_id = (last['id_perfil'] + 1) if last and 'id_perfil' in last else 1
        result = await db.perfis.insert_one({'id_perfil': next_id, 'nome': 'Administrador', 'permissoes': ['admin']})
        perfil_id = next_id
    else:
        perfil_id = perfil['id_perfil']
    await db.colaboradores.update_one({'email': 'admin@admin.com'}, {'$set': {'id_perfil': perfil_id}})
    print('Colaborador admin@admin.com agora é administrador!')

if __name__ == '__main__':
    asyncio.run(fix_admin())
