// ...existing code...
// Componente de alerta de vencimento
function VencimentoAlert({ inscricoes }) {
  const hoje = new Date();
  let vencidas = 0;
  let proximas = 0;
  inscricoes.forEach(insc => {
    if (!insc.data_vencimento) return;
    const venc = new Date(insc.data_vencimento);
    if (venc < hoje) vencidas++;
    else if ((venc - hoje) / (1000 * 60 * 60 * 24) <= 7 && (venc - hoje) > 0) proximas++;
  });
  if (vencidas === 0 && proximas === 0) return null;
  return (
    <div className="mt-2 text-xs">
      {vencidas > 0 && <span className="text-red-600 mr-2">⚠️ {vencidas} inscrições vencidas</span>}
      {proximas > 0 && <span className="text-yellow-600">⏳ {proximas} próximas do vencimento</span>}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { API } from '@/App';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function Relatorios() {
  const [relatorio, setRelatorio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [inscricoes, setInscricoes] = useState([]);
  const [loadingInscricoes, setLoadingInscricoes] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cursosRes, trilhasRes] = await Promise.all([
          axios.get(`${API}/cursos`),
          axios.get(`${API}/trilhas`),
        ]);
        const cursos = cursosRes.data;
        const trilhas = trilhasRes.data;
        // Conta cursos por trilha
        const trilhaMap = {};
        trilhas.forEach(t => {
          trilhaMap[t.id_trilha] = t.nome;
        });
        const count = {};
        cursos.forEach(curso => {
          if (curso.id_trilha && trilhaMap[curso.id_trilha]) {
            const nome = trilhaMap[curso.id_trilha];
            count[nome] = (count[nome] || 0) + 1;
          }
        });
        const relatorioArr = Object.entries(count).map(([trilha, cursos]) => ({ trilha, cursos }));
        setRelatorio(relatorioArr);
      } catch (err) {
        setRelatorio([]);
      } finally {
        setLoading(false);
      }
    }
    async function fetchStats() {
      try {
        const statsRes = await axios.get(`${API}/dashboard/stats`);
        setStats(statsRes.data);
      } catch (err) {
        setStats(null);
      } finally {
        setLoadingStats(false);
      }
    }
    async function fetchInscricoes() {
      try {
        const res = await axios.get(`${API}/inscricoes`);
        setInscricoes(res.data);
      } catch (err) {
        setInscricoes([]);
      } finally {
        setLoadingInscricoes(false);
      }
    }
    fetchData();
    fetchStats();
    fetchInscricoes();
  }, []);

  // Gráfico de inscrições por status
  const statusCounts = inscricoes.reduce((acc, insc) => {
    acc[insc.status] = (acc[insc.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([status, value]) => ({ name: status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' '), value }));
  const statusColors = {
    Pendente: '#facc15',
    Concluido: '#22c55e',
    Cancelado: '#a3a3a3',
    'Em andamento': '#3b82f6',
    Vencido: '#ef4444'
  };

  // Gráfico de evolução ao longo do tempo
  const evolutionData = inscricoes.reduce((acc, insc) => {
    const date = new Date(insc.data_inscricao).toLocaleDateString();
    const found = acc.find(item => item.date === date);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);


  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatórios</h1>
          <p className="text-gray-600">Análises e estatísticas detalhadas</p>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {loadingStats ? (
            <Card className="border-0 shadow-lg col-span-6">
              <CardContent className="p-8 text-center text-gray-500">Carregando indicadores...</CardContent>
            </Card>
          ) : stats ? (
            <>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Cursos</div>
                  <div className="text-2xl font-bold text-green-700">{stats.total_cursos}</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Colaboradores</div>
                  <div className="text-2xl font-bold text-blue-700">{stats.total_colaboradores}</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Inscrições</div>
                  <div className="text-2xl font-bold text-teal-700">{stats.total_inscricoes}</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Aprovadas</div>
                  <div className="text-2xl font-bold text-green-600">{stats.inscricoes_concluidas}</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Pendentes</div>
                  <div className="text-2xl font-bold text-yellow-600">{stats.inscricoes_pendentes}</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Taxa de conclusão</div>
                  <div className="text-2xl font-bold text-indigo-700">{stats.taxa_conclusao}%</div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-0 shadow-lg col-span-6">
              <CardContent className="p-8 text-center text-gray-500">Não foi possível carregar os indicadores.</CardContent>
            </Card>
          )}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cursos por Trilha</h3>
            {loading ? (
              <div className="text-gray-500">Carregando...</div>
            ) : relatorio.length === 0 ? (
              <div className="text-gray-500">Nenhum dado encontrado.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">Trilha</th>
                      <th className="px-4 py-2 border-b">Quantidade de Cursos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorio.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border-b">{item.trilha}</td>
                        <td className="px-4 py-2 border-b">{item.cursos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inscrições por Status</h3>
              {loadingInscricoes ? (
                <div className="text-gray-500">Carregando...</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {statusData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={statusColors[entry.name] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução de Inscrições</h3>
              {loadingInscricoes ? (
                <div className="text-gray-500">Carregando...</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={evolutionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#6366f1" name="Inscrições" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabela detalhada de inscrições */}
        <Card className="border-0 shadow-lg mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tabela detalhada de inscrições</h3>
                {/* Alerta de vencimento */}
                <VencimentoAlert inscricoes={inscricoes} />
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={() => exportTable('csv')}>Exportar CSV</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm" onClick={() => exportTable('pdf')}>Exportar PDF</button>
              </div>
            </div>
            {loadingInscricoes ? (
              <div className="text-gray-500">Carregando inscrições...</div>
            ) : inscricoes.length === 0 ? (
              <div className="text-gray-500">Nenhuma inscrição encontrada.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-left text-xs">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 border-b">Colaborador</th>
                      <th className="px-2 py-2 border-b">Curso</th>
                      <th className="px-2 py-2 border-b">Status</th>
                      <th className="px-2 py-2 border-b">Data Inscrição</th>
                      <th className="px-2 py-2 border-b">Data Conclusão</th>
                      <th className="px-2 py-2 border-b">Nota</th>
                      <th className="px-2 py-2 border-b">Vencimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscricoes.map((insc, idx) => (
                      <tr key={idx} className={isVencida(insc) ? 'bg-red-50' : ''}>
                        <td className="px-2 py-2 border-b">{insc.nome_colaborador || insc.id_colaborador}</td>
                        <td className="px-2 py-2 border-b">{insc.titulo_curso || insc.id_curso}</td>
                        <td className="px-2 py-2 border-b">{insc.status}</td>
                        <td className="px-2 py-2 border-b">{formatDate(insc.data_inscricao)}</td>
                        <td className="px-2 py-2 border-b">{formatDate(insc.data_conclusao)}</td>
                        <td className="px-2 py-2 border-b">{insc.nota ?? '-'}</td>
                        <td className="px-2 py-2 border-b">{formatDate(insc.data_vencimento)}{isVencida(insc) ? ' ⚠️' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-2 text-xs text-red-600">⚠️ Inscrições vencidas ou próximas do vencimento estão destacadas.</div>



          </CardContent>
        </Card>

        {/* Funções utilitárias para exportação e alerta */}
        {/* ...existing code... */}
      </div>
    </Layout>
  );

  // Função para exportar tabela
  function exportTable(type) {
    // Simples exportação CSV
    if (type === 'csv') {
      const header = ['Colaborador','Curso','Status','Data Inscrição','Data Conclusão','Nota','Vencimento'];
      const rows = inscricoes.map(insc => [
        insc.nome_colaborador || insc.id_colaborador,
        insc.titulo_curso || insc.id_curso,
        insc.status,
        formatDate(insc.data_inscricao),
        formatDate(insc.data_conclusao),
        insc.nota ?? '-',
        formatDate(insc.data_vencimento)
      ]);
      const csv = [header, ...rows].map(r => r.join(';')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'inscricoes.csv';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
      window.print(); // Simples: imprime a página
    }
  }

  // Função para formatar datas
  function formatDate(date) {
    if (!date) return '-';
    const d = new Date(date);
    if (isNaN(d)) return '-';
    return d.toLocaleDateString();
  }

  // Função para alerta de vencimento
  function isVencida(insc) {
    if (!insc.data_vencimento) return false;
    const hoje = new Date();
    const venc = new Date(insc.data_vencimento);
    return venc < hoje;
  }

}