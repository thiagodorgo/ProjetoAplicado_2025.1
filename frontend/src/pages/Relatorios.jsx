import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function Relatorios() {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatórios</h1>
          <p className="text-gray-600">Análises e estatísticas detalhadas</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Relatórios em Desenvolvimento</h3>
            <p className="text-gray-600">Esta funcionalidade estará disponível em breve</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
