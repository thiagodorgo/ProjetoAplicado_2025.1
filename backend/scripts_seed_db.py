from pymongo import MongoClient

MONGO = 'mongodb://localhost:27017/'
DBNAME = 'techsolutions_treinamentos'

client = MongoClient(MONGO)
db = client[DBNAME]

# Upsert perfil
perfil = {
    'id_perfil': 1,
    'nome': 'Administrador',
    'permissoes': ['admin']
}
res = db.perfis.update_one({'id_perfil': perfil['id_perfil']}, {'$set': perfil}, upsert=True)
print('perfil upserted, matched:', res.matched_count, 'modified:', res.modified_count)

# Upsert area
area = {
    'id_area': 1,
    'nome': 'Campo',
    'departamento': 'Produção',
    'localizacao': None
}
res = db.areas.update_one({'id_area': area['id_area']}, {'$set': area}, upsert=True)
print('area upserted, matched:', res.matched_count, 'modified:', res.modified_count)

# Upsert cargo
cargo = {
    'id_cargo': 1,
    'nome': 'Trabalhador Rural',
    'descricao': None,
    'requer_nr31': True
}
res = db.cargos.update_one({'id_cargo': cargo['id_cargo']}, {'$set': cargo}, upsert=True)
print('cargo upserted, matched:', res.matched_count, 'modified:', res.modified_count)

# Update counters to avoid ID conflicts
counters = {
    'areas': 1,
    'cargos': 1,
    'perfis': 1,
    'colaboradores': db.colaboradores.count_documents({}) or 1,
}
for k, v in counters.items():
    db.counters.update_one({'_id': k}, {'$set': {'seq': v}}, upsert=True)
print('counters updated')

# Update colaborador João Silva to reference these ids
res = db.colaboradores.update_one({'email': 'joao@example.com'}, {'$set': {'id_perfil': 1, 'id_area': 1, 'id_cargo': 1}})
print('colaborador updated, matched:', res.matched_count, 'modified:', res.modified_count)

# Print current entries
print('perfis:', list(db.perfis.find({}, {'_id':0})))
print('areas:', list(db.areas.find({}, {'_id':0})))
print('cargos:', list(db.cargos.find({}, {'_id':0})))
print('colaborador:', list(db.colaboradores.find({'email':'joao@example.com'}, {'_id':0})))

client.close()
