import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({ text = 'Loading...', fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-sm font-medium text-slate-600">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-2">
      <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
      <p className="text-xs text-slate-500 font-medium">{text}</p>
    </div>
  );
}
