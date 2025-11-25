import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import axios from 'axios';
import { API } from '@/App';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Users, Mail, Briefcase, Search, X } from 'lucide-react';

export default function Colaboradores() {
  const [editColab, setEditColab] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteColab, setDeleteColab] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const response = await axios.get(`${API}/colaboradores`);
      setColaboradores(response.data);
    } catch (error) {
      toast.error('Erro ao carregar colaboradores');
    } finally {
      setLoading(false);
    }
  };

  // Filtro de busca
  const normalized = (str) => (str || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const filteredColaboradores = colaboradores.filter((colab) => {
    const s = normalized(search);
    return (
      !s ||
      normalized(colab.nome).includes(s) ||
      normalized(colab.email).includes(s) ||
      String(colab.id_cargo).includes(s)
    );
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Colaboradores</h1>
          <p className="text-gray-600">Visualize todos os colaboradores do sistema</p>
        </div>

        {/* Campo de busca */}
        <div className="relative w-full max-w-xl mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou cargo..."
            className="pl-10 pr-10 py-2 border rounded w-full focus:outline-none focus:ring focus:border-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearch('')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {filteredColaboradores.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum colaborador encontrado</h3>
              <p className="text-gray-600">Altere a busca ou registre novos colaboradores</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColaboradores.map((colab) => (
              <Card key={colab.id_colaborador} className="card-hover border-0 shadow-lg" data-testid={`colaborador-card-${colab.id_colaborador}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {colab.nome.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{colab.nome}</h3>
                      <p className="text-sm text-gray-500">ID: {colab.id_colaborador}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{colab.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>Cargo: {colab.id_cargo}</span>
                    </div>
                  </div>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <button
                              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold border border-gray-300 text-blue-700 bg-transparent hover:bg-gray-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
                              style={{ borderRadius: '0.5rem' }}
                              onClick={() => { setEditColab(colab); setShowEdit(true); }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#2563eb"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5 11.828a2 2 0 010-2.828l6.536-6.536z" /></svg>
                              Editar
                            </button>
                            <button
                              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold border border-gray-300 text-red-700 bg-transparent hover:bg-gray-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
                              style={{ borderRadius: '0.5rem' }}
                              onClick={() => { setDeleteColab(colab); setShowDelete(true); }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#dc2626"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              Excluir
                            </button>
                          </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    {/* Modal de edição */}
    {showEdit && editColab && (
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
            <h2 className="text-lg font-bold mb-4">Editar colaborador</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditColab(); }}>
              <div className="mb-2">
                <label className="block text-xs mb-1">Nome</label>
                <input type="text" className="border rounded px-2 py-1 w-full" value={editColab.nome} onChange={e => setEditColab({ ...editColab, nome: e.target.value })} />
              </div>
              <div className="mb-2">
                <label className="block text-xs mb-1">Email</label>
                <input type="email" className="border rounded px-2 py-1 w-full" value={editColab.email} onChange={e => setEditColab({ ...editColab, email: e.target.value })} />
              </div>
              <div className="mb-2">
                <label className="block text-xs mb-1">Cargo</label>
                <input type="text" className="border rounded px-2 py-1 w-full" value={editColab.id_cargo} onChange={e => setEditColab({ ...editColab, id_cargo: e.target.value })} />
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Salvar</button>
                <button type="button" className="px-3 py-1 bg-gray-300 rounded" onClick={() => setShowEdit(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    )}
    {/* Modal de exclusão */}
    {showDelete && deleteColab && (
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
            <h2 className="text-lg font-bold mb-4">Excluir colaborador</h2>
            <p className="mb-4">Tem certeza que deseja excluir <span className="font-semibold">{deleteColab.nome}</span>?</p>
            <div className="flex gap-2 mt-4">
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={handleDeleteColab}>Excluir</button>
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setShowDelete(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      </Dialog>
    )}
  </Layout>
  );

  // Função para editar colaborador
  async function handleEditColab() {
    try {
      await axios.put(`${API}/colaboradores/${editColab.id_colaborador}`, editColab);
      toast.success('Colaborador atualizado com sucesso');
      setShowEdit(false);
      fetchColaboradores();
    } catch (err) {
      toast.error('Erro ao atualizar colaborador');
    }
  }

  // Função para excluir colaborador
  async function handleDeleteColab() {
    try {
      await axios.delete(`${API}/colaboradores/${deleteColab.id_colaborador}`);
      toast.success('Colaborador excluído com sucesso');
      setShowDelete(false);
      fetchColaboradores();
    } catch (err) {
      toast.error('Erro ao excluir colaborador');
    }
  }
}