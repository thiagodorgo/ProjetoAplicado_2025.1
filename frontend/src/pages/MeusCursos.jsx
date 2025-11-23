import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API, AuthContext } from '@/App';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { GraduationCap, Award, Clock } from 'lucide-react';

export default function MeusCursos() {
  const { user } = useContext(AuthContext);
  const [meusCursos, setMeusCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeusCursos();
    // eslint-disable-next-line
  }, []);

  const fetchMeusCursos = async () => {
    try {
      // Busca apenas as inscrições do usuário logado
      const inscricoesRes = await axios.get(`${API}/inscricoes?id_colaborador=${user.id_colaborador}`);
      const inscricoes = inscricoesRes.data;
      // Para cada inscrição, busca o curso correspondente
      const cursosPromises = inscricoes.map(insc => axios.get(`${API}/cursos/${insc.id_curso}`));
      const cursosRes = await Promise.allSettled(cursosPromises);
      // Monta lista de cursos com progresso e status
      const cursosCompletos = inscricoes.map((insc, idx) => {
        const cursoData = cursosRes[idx].status === 'fulfilled' ? cursosRes[idx].value.data : null;
        return cursoData ? { ...cursoData, status: insc.status, id_inscricao: insc.id_inscricao } : null;
      }).filter(Boolean);
      setMeusCursos(cursosCompletos);
    } catch (error) {
      toast.error('Erro ao carregar seus cursos');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pendente: 'status-pendente',
      em_andamento: 'status-em_andamento',
      concluido: 'status-concluido',
      cancelado: 'status-cancelado'
    };
    const labels = {
      pendente: 'Pendente',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return <span className={`status-badge ${styles[status]}`}>{labels[status]}</span>;
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Meus Cursos</h1>
          <p className="text-gray-600">Acompanhe seu progresso e certificados</p>
        </div>

        {meusCursos.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma inscrição encontrada</h3>
              <p className="text-gray-600">Você ainda não está inscrito em nenhum curso</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {meusCursos.map((curso) => (
              <Card key={curso.id_inscricao} className="card-hover border-0 shadow-lg" data-testid={`inscricao-card-${curso.id_inscricao}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{curso.titulo}</CardTitle>
                    <span className={`status-badge status-${curso.status}`}>{curso.status.charAt(0).toUpperCase() + curso.status.slice(1).replace('_', ' ')}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {curso.descricao || 'Sem descrição'}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progresso</span>
                      {/* Progresso não está disponível diretamente, pode ser adicionado se necessário */}
                      <span className="font-semibold">-</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{curso.carga_horaria}h</span>
                    </div>
                    {curso.status === 'concluido' && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Award className="w-4 h-4" />
                        <span>Certificado disponível</span>
                      </div>
                    )}
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