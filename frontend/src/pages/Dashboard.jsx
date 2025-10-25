import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '@/App';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, ClipboardCheck, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      toast.error('Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total de Cursos',
      value: stats?.total_cursos || 0,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      testId: 'total-cursos',
      action: () => navigate('/cursos')
    },
    {
      title: 'Colaboradores',
      value: stats?.total_colaboradores || 0,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      testId: 'total-colaboradores',
      action: () => navigate('/colaboradores')
    },
    {
      title: 'Inscrições Concluídas',
      value: stats?.inscricoes_concluidas || 0,
      icon: ClipboardCheck,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      testId: 'inscricoes-concluidas',
      action: () => navigate('/meus-cursos')
    },
    {
      title: 'Inscrições Pendentes',
      value: stats?.inscricoes_pendentes || 0,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      testId: 'inscricoes-pendentes',
      action: () => navigate('/meus-cursos')
    },
  ];

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
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de treinamentos obrigatórios (NR-31)</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="card-hover border-0 shadow-lg overflow-hidden"
                data-testid={stat.testId}
              >
                <button
                  type="button"
                  onClick={stat.action}
                  className="block w-full text-left appearance-none bg-transparent p-0 m-0 border-0"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </button>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/cursos"
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-200 group"
                data-testid="quick-action-cursos"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">Gerenciar Cursos</h3>
                <p className="text-sm text-gray-600">Criar e editar cursos do sistema</p>
              </a>

              <a
                href="/colaboradores"
                className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-200 group"
                data-testid="quick-action-colaboradores"
              >
                <Users className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">Gerenciar Colaboradores</h3>
                <p className="text-sm text-gray-600">Adicionar e visualizar colaboradores</p>
              </a>

              <a
                href="/regras"
                className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:shadow-lg transition-all duration-200 group"
                data-testid="quick-action-regras"
              >
                <ClipboardCheck className="w-8 h-8 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">Regras Obrigatórias</h3>
                <p className="text-sm text-gray-600">Configurar treinamentos obrigatórios</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
