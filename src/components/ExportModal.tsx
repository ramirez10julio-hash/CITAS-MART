import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Code, Sparkles, X } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, htmlCode }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'code'>('instructions');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0e1015] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14171f]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#d4af37]/15 text-[#f5d77f]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">
                Publicar en GitHub en 1 Solo Archivo
              </h3>
              <p className="text-xs text-neutral-400">
                Todo el HTML, CSS, JavaScript y el Logo CitaSmart integrados en un único archivo autónomo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-6 bg-[#0a0c10]">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors ${
              activeTab === 'instructions'
                ? 'border-[#d4af37] text-[#f5d77f]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Pasos para Publicar (30 Segundos)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-[#d4af37] text-[#f5d77f]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            Ver Código Fuente HTML/CSS
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'instructions' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#141822] border border-[#d4af37]/30">
                <h4 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 mb-1">
                  <span>🚀</span> ¿Cómo publicar en GitHub Pages sin compilar nada?
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Este archivo contiene todo lo necesario (estilos, tipografías de Google, logotipo SVG y lógica de reserva en JavaScript puro). No requiere Node.js, dependencias ni pasos de build.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-white">Descarga el archivo único</span>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Haz clic en el botón dorado "Descargar index.html" a continuación.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-white">Súbelo a tu repositorio de GitHub</span>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Crea un nuevo repositorio en GitHub (o usa uno existente) y sube el archivo con el nombre <code className="text-[#f5d77f] px-1 py-0.5 bg-black/40 rounded">index.html</code> en la raíz.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-white">Activa GitHub Pages</span>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      En tu repo, ve a <strong>Settings → Pages → Branch: main / root → Save</strong>. En 30 segundos tu web estará pública gratis en <code className="text-[#f5d77f]">https://tu-usuario.github.io/tu-repo/</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <pre className="text-xs font-mono text-neutral-300 bg-[#07080a] p-4 rounded-xl border border-white/10 overflow-x-auto max-h-[350px]">
                {htmlCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#12141c]">
          <a
            href="/standalone.html"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#f5d77f] hover:underline flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir archivo autónomo en pestaña nueva
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? '¡Copiado al Portapapeles!' : 'Copiar Código'}
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-[#f5d77f] to-[#d4af37] text-neutral-950 hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#d4af37]/20"
            >
              <Download className="w-4 h-4" />
              Descargar index.html
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
