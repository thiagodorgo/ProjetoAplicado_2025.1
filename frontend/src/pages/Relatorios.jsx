
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { API } from '@/App';

export default function Relatorios() {
  const [relatorio, setRelatorio] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatórios</h1>
          <p className="text-gray-600">Análises e estatísticas detalhadas</p>
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
      </div>
    </Layout>
  );
}
