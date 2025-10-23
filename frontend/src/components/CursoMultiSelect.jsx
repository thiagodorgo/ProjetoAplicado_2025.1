// UI component for multi-selecting courses in the Trilha form
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function CursoMultiSelect({ cursos, selectedIds, onChange }) {
  return (
    <div>
      <Label className="mb-1 block">Vincular a Cursos</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
        {cursos.map((curso) => (
          <label key={curso.id_curso} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={selectedIds.includes(curso.id_curso)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...selectedIds, curso.id_curso]);
                } else {
                  onChange(selectedIds.filter((id) => id !== curso.id_curso));
                }
              }}
            />
            <span>{curso.titulo}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
