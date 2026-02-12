import { Home, Plus, Search } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';
import { Button } from './ui/button';

export function Root() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="font-bold text-slate-900">No Hallcination</h1>
                <p className="text-xs text-slate-500">ハルシネーションをなくす</p>
              </div>
            </Link>
            <Button variant="ghost" size="sm">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>
        <Outlet />
      </main>

      {/* ボトムナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-inset-bottom">
        <div className="flex items-center justify-center gap-24 px-4 py-3">
          <Link to="/" className="flex flex-col items-center gap-1">
            <Home className={`w-6 h-6 ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span className={`text-xs ${location.pathname === '/' ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
              ホーム
            </span>
          </Link>
          
          <Link to="/new" className="flex flex-col items-center gap-1 -mt-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
