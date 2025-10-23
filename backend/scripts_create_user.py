import json
import urllib.request

BASE = 'http://localhost:8001'

def post(path, data):
    url = BASE + path
    b = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=b, headers={'Content-Type':'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode('utf-8')
            print(path, '->', resp.status)
            try:
                print(json.dumps(json.loads(body), indent=2, ensure_ascii=False))
            except Exception:
                print(body)
            return json.loads(body)
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8') if e.fp else ''
        print(path, 'HTTPError', e.code, body)
    except Exception as e:
        print(path, 'Exception', e)

# 1) Create area
area = {'nome':'Campo','departamento':'Produção'}
post('/api/areas', area)

# 2) Create cargo
cargo = {'nome':'Trabalhador Rural','requer_nr31':True}
post('/api/cargos', cargo)

 # 3) Create perfil admin
perfil_admin = {'nome':'Administrador','permissoes':['admin']}
post('/api/perfis', perfil_admin)

# 3b) Create perfil aluno
perfil_aluno = {'nome':'Aluno','permissoes':[]}
post('/api/perfis', perfil_aluno)


# 4) Register collaborator admin
colab_admin = {
    'nome':'João Silva',
    'email':'joao@example.com',
    'senha':'senha123',
    'cpf':'123.456.789-00',
    'id_cargo':1,
    'id_area':1,
    'id_perfil':1,
    'ativo':True
}
post('/api/auth/register', colab_admin)

# 4b) Register collaborator aluno
colab_aluno = {
    'nome':'Apresentação 23/10',
    'email':'senai@senai.com',
    'senha':'senai',
    'cpf':'',
    'id_cargo':1,
    'id_area':1,
    'id_perfil':2,
    'ativo':True
}
post('/api/auth/register', colab_aluno)

# 5) Login
login = {'email':'joao@example.com','senha':'senha123'}
post('/api/auth/login', login)
