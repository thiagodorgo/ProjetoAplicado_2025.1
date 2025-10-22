import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '@/App';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Users, Mail, Briefcase } from 'lucide-react';

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);

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

        {colaboradores.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum colaborador cadastrado</h3>
              <p className="text-gray-600">Os colaboradores aparecerão aqui quando forem registrados</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colaboradores.map((colab) => (
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

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{colab.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>Cargo: {colab.id_cargo}</span>
                    </div>
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
