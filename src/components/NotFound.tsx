import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

export function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        ページが見つかりません
      </h1>
      <p className="text-slate-600 mb-6">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link to="/">
        <Button>
          ホームに戻る
        </Button>
      </Link>
    </div>
  );
}
