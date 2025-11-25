import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '@/App';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function InscricoesPendentes() {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInscricoes();
  }, []);

  const fetchInscricoes = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${API}/inscricoes?status=pendente`);
      setInscricoes(resp.data);
    } catch (e) {
      toast.error('Erro ao carregar inscrições pendentes');
    } finally {
      setLoading(false);
    }
  };

  const handleAprovar = async (id_inscricao) => {
    try {
      await axios.put(`${API}/inscricoes/${id_inscricao}`, { status: 'concluido' });
      toast.success('Inscrição aprovada!');
      fetchInscricoes();
    } catch (e) {
      toast.error('Erro ao aprovar inscrição');
    }
  };

  const handleRejeitar = async (id_inscricao) => {
    try {
      await axios.put(`${API}/inscricoes/${id_inscricao}`, { status: 'cancelado' });
      toast.success('Inscrição rejeitada!');
      fetchInscricoes();
    } catch (e) {
      toast.error('Erro ao rejeitar inscrição');
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscrições Pendentes</h1>
        <p className="text-gray-600 mb-6">Aprove ou rejeite pedidos de inscrição em cursos</p>
        {inscricoes.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma inscrição pendente</h3>
              <p className="text-gray-600">Todos os pedidos já foram processados</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inscricoes.map((insc) => (
              <Card key={insc.id_inscricao} className="card-hover border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Inscrição #{insc.id_inscricao}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Colaborador:</strong> {insc.id_colaborador}</div>
                  <div><strong>Curso:</strong> {insc.id_curso}</div>
                  <div><strong>Data de inscrição:</strong> {new Date(insc.data_inscricao).toLocaleString()}</div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => handleAprovar(insc.id_inscricao)} className="bg-green-600 text-white">Aprovar</Button>
                    <Button onClick={() => handleRejeitar(insc.id_inscricao)} variant="outline" className="text-red-600 border-red-300">Rejeitar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
