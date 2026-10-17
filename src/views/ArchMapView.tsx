import React, { useState } from 'react';
import {
  Map as MapIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  List,
  Eye,
  Layers
} from 'lucide-react';
import { TechRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';
import { downloadFile } from '../services/storage.ts';

interface ArchMapViewProps {
  catalog: TechRecord[];
  lang: Language;
  onSelectTech: (tech: TechRecord) => void;
}

export const ArchMapView: React.FC<ArchMapViewProps> = ({
  catalog,
  lang,
  onSelectTech
}) => {
  const t = DICT[lang];

  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'diagram' | 'text'>('diagram');

  const layers = [
    {
      id: 'client',
      title: t.layerClient,
      color: '#38bdf8',
      filter: (t: TechRecord) => t.categoryCode === 'A' || t.categoryCode === 'B' || t.categoryCode === 'F' || t.categoryCode === 'G'
    },
    {
      id: 'api',
      title: t.layerApi,
      color: '#818cf8',
      filter: (t: TechRecord) => t.categoryCode === 'K'
    },
    {
      id: 'runtime',
      title: t.layerRuntime,
      color: '#06b6d4',
      filter: (t: TechRecord) => t.categoryCode === 'C' || t.categoryCode === 'D' || t.categoryCode === 'H'
    },
    {
      id: 'data',
      title: t.layerData,
      color: '#10b981',
      filter: (t: TechRecord) => t.categoryCode === 'J'
    },
    {
      id: 'infra',
      title: t.layerInfra,
      color: '#f59e0b',
      filter: (t: TechRecord) => t.categoryCode === 'L' || t.categoryCode === 'I' || t.categoryCode === 'O' || t.categoryCode === 'P'
    }
  ];

  const handleExportSVG = () => {
    const svgEl = document.getElementById('landscape-map-svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    downloadFile(source, `tech-landscape-map-${Date.now()}.svg`, 'image/svg+xml');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{t.mapTitle}</span>
            <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              Interactive Landscape
            </span>
          </h2>
          <p className="text-xs text-slate-400">{t.mapSubtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode('diagram')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'diagram' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Diagram
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'text' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.textAlternative}
            </button>
          </div>

          {viewMode === 'diagram' && (
            <>
              <button
                onClick={() => setZoom(z => Math.min(z + 0.2, 2.0))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleExportSVG}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>SVG</span>
              </button>
            </>
          )}
        </div>
      </div>

      {viewMode === 'diagram' ? (
        /* Interactive Landscape SVG */
        <div className="p-4 rounded-2xl glass-card overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[700px] bg-slate-950 p-6 rounded-xl border border-slate-800">
            <svg
              id="landscape-map-svg"
              viewBox="0 0 1000 700"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', minWidth: '950px' }}
              className="w-full transition-transform duration-200 select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {layers.map((layer, lIdx) => {
                const yPos = 30 + lIdx * 135;
                const items = catalog.filter(layer.filter).slice(0, 10);

                return (
                  <g key={layer.id}>
                    {/* Layer Container Box */}
                    <rect
                      x="30"
                      y={yPos}
                      width="940"
                      height="115"
                      rx="12"
                      fill="#0e131f"
                      stroke={layer.color}
                      strokeWidth="1.5"
                      strokeDasharray="8 4"
                    />

                    {/* Layer Title Label */}
                    <rect
                      x="45"
                      y={yPos - 12}
                      width="240"
                      height="24"
                      rx="6"
                      fill="#07090e"
                      stroke={layer.color}
                      strokeWidth="1"
                    />
                    <text
                      x="55"
                      y={yPos + 4}
                      fill={layer.color}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {layer.title.toUpperCase()}
                    </text>

                    {/* Technology Nodes inside layer */}
                    {items.map((tech, tIdx) => {
                      const xPos = 55 + (tIdx % 5) * 175;
                      const subY = yPos + 22 + Math.floor(tIdx / 5) * 44;

                      return (
                        <g
                          key={tech.id}
                          className="cursor-pointer group hover:opacity-80"
                          onClick={() => onSelectTech(tech)}
                        >
                          <rect
                            x={xPos}
                            y={subY}
                            width="165"
                            height="36"
                            rx="8"
                            fill="#141c2e"
                            stroke="#334155"
                            strokeWidth="1"
                          />
                          <text
                            x={xPos + 10}
                            y={subY + 22}
                            fill="#f8fafc"
                            fontSize="11"
                            fontWeight="600"
                          >
                            {tech.name.length > 18 ? tech.name.slice(0, 16) + '...' : tech.name}
                          </text>
                          <circle cx={xPos + 150} cy={subY + 18} r="3" fill={layer.color} />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      ) : (
        /* Accessible Text Alternative */
        <div className="space-y-6">
          {layers.map(layer => {
            const items = catalog.filter(layer.filter);
            return (
              <div key={layer.id} className="p-5 rounded-2xl glass-card space-y-3">
                <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
                  <span>{layer.title}</span>
                  <span className="text-slate-500 font-mono text-xs">({items.length} items)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {items.map(tech => (
                    <div
                      key={tech.id}
                      onClick={() => onSelectTech(tech)}
                      className="p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 cursor-pointer transition flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-xs text-slate-200 block">{tech.name}</span>
                        <span className="text-[11px] text-slate-400">{tech.category}</span>
                      </div>
                      <span className="text-[10px] text-sky-400 font-mono">{t.viewDetails}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
