import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

export function ColorPicker({ label, value, onChange, presetColors }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const defaultPresets = [
    '#B05E27', '#FFD180', '#4E6B47', '#7A6240', 
    '#E3D9CC', '#F1F1F1', '#2A2A2A', '#DC2626',
    '#059669', '#3B82F6', '#8B5CF6', '#F59E0B'
  ];
  
  const presets = presetColors || defaultPresets;

  return (
    <div className="space-y-2">
      <Label htmlFor={`color-${label}`}>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => setIsOpen(true)}
          >
            <div
              className="w-6 h-6 rounded border border-border"
              style={{ backgroundColor: value }}
            />
            {value}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`hex-${label}`}>Código Hex</Label>
              <Input
                id={`hex-${label}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#000000"
              />
            </div>
            
            <div>
              <Label>Cores Predefinidas</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {presets.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onChange(color);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor={`picker-${label}`}>Seletor de Cor</Label>
              <input
                id={`picker-${label}`}
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 rounded border border-border cursor-pointer"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}