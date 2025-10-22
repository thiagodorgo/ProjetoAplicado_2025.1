import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '@/App';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Settings, Trash2 } from 'lucide-react';

export default function RegrasObrigatorias() {
  const [regras, setRegras] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_curso: '',
    id_cargo: '',
    id_area: '',
    validade_certificado_meses: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [regrasRes, cursosRes, cargosRes, areasRes] = await Promise.all([
        axios.get(`${API}/regras-obrigatorias`),
        axios.get(`${API}/cursos`),
        axios.get(`${API}/cargos`),
        axios.get(`${API}/areas`)
      ]);
      setRegras(regrasRes.data);
      setCursos(cursosRes.data);
      setCargos(cargosRes.data);
      setAreas(areasRes.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/regras-obrigatorias`, {
        id_curso: formData.id_curso ? parseInt(formData.id_curso) : null,
        id_trilha: null,
        id_cargo: formData.id_cargo ? parseInt(formData.id_cargo) : null,
        id_area: formData.id_area ? parseInt(formData.id_area) : null,
        validade_certificado_meses: parseInt(formData.validade_certificado_meses)
      });
      toast.success('Regra criada com sucesso!');
      setDialogOpen(false);
      fetchData();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erro ao criar regra');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente deletar esta regra?')) return;
    
    try {
      await axios.delete(`${API}/regras-obrigatorias/${id}`);
      toast.success('Regra deletada com sucesso!');
      fetchData();
    } catch (error) {
      toast.error('Erro ao deletar regra');
    }
  };

  const resetForm = () => {
    setFormData({
      id_curso: '',
      id_cargo: '',
      id_area: '',
      validade_certificado_meses: ''
    });
  };

  const getCursoNome = (id) => cursos.find(c => c.id_curso === id)?.titulo || `Curso ${id}`;
  const getCargoNome = (id) => cargos.find(c => c.id_cargo === id)?.nome || `Cargo ${id}`;
  const getAreaNome = (id) => areas.find(a => a.id_area === id)?.nome || `Área ${id}`;

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Regras Obrigatórias</h1>
            <p className="text-gray-600">Configure treinamentos obrigatórios por cargo ou área</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-lg"
                data-testid="create-regra-button"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nova Regra
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Regra Obrigatória</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="id_curso">Curso *</Label>
                  <Select
                    value={formData.id_curso}
                    onValueChange={(value) => setFormData({ ...formData, id_curso: value })}
                  >
                    <SelectTrigger data-testid="regra-curso-select">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {cursos.map(curso => (
                        <SelectItem key={curso.id_curso} value={curso.id_curso.toString()}>
                          {curso.titulo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="id_cargo">Cargo (opcional)</Label>
                  <Select
                    value={formData.id_cargo}
                    onValueChange={(value) => setFormData({ ...formData, id_cargo: value })}
                  >
                    <SelectTrigger data-testid="regra-cargo-select">
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargos.map(cargo => (
                        <SelectItem key={cargo.id_cargo} value={cargo.id_cargo.toString()}>
                          {cargo.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="id_area">Área (opcional)</Label>
                  <Select
                    value={formData.id_area}
                    onValueChange={(value) => setFormData({ ...formData, id_area: value })}
                  >
                    <SelectTrigger data-testid="regra-area-select">
                      <SelectValue placeholder="Selecione uma área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map(area => (
                        <SelectItem key={area.id_area} value={area.id_area.toString()}>
                          {area.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="validade">Validade do Certificado (meses) *</Label>
                  <Input
                    id="validade"
                    type="number"
                    value={formData.validade_certificado_meses}
                    onChange={(e) => setFormData({ ...formData, validade_certificado_meses: e.target.value })}
                    required
                    data-testid="regra-validade-input"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" data-testid="regra-submit-button">
                    Criar Regra
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {regras.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Settings className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma regra cadastrada</h3>
              <p className="text-gray-600">Comece criando regras de treinamento obrigatório</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regras.map((regra) => (
              <Card key={regra.id_regra} className="card-hover border-0 shadow-lg" data-testid={`regra-card-${regra.id_regra}`}>
                <CardHeader>
                  <CardTitle className="text-lg">Regra #{regra.id_regra}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Curso</p>
                    <p className="text-base font-semibold text-gray-900">
                      {regra.id_curso ? getCursoNome(regra.id_curso) : 'Não especificado'}
                    </p>
                  </div>

                  {regra.id_cargo && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Cargo</p>
                      <p className="text-base text-gray-900">{getCargoNome(regra.id_cargo)}</p>
                    </div>
                  )}

                  {regra.id_area && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Área</p>
                      <p className="text-base text-gray-900">{getAreaNome(regra.id_area)}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-500">Validade do Certificado</p>
                    <p className="text-base text-gray-900">{regra.validade_certificado_meses} meses</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(regra.id_regra)}
                    className="w-full text-red-600 hover:bg-red-50 mt-4"
                    data-testid={`delete-regra-${regra.id_regra}`}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deletar Regra
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
