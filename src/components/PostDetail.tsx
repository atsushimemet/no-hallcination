import { useParams, Link } from 'react-router';
import { ArrowLeft, ThumbsUp, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { getPostById, type Comment } from '../lib/mockData';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function PostDetail() {
  const { id } = useParams();
  const post = getPostById(id || '');
  const [newComment, setNewComment] = useState('');
  
  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">投稿が見つかりません</h2>
        <Link to="/">
          <Button>ホームに戻る</Button>
        </Link>
      </div>
    );
  }
  
  const evidenceLevelConfig = {
    A: { label: '証拠レベルA', color: 'bg-green-500', desc: '査読済み論文・公的機関' },
    B: { label: '証拠レベルB', color: 'bg-blue-500', desc: '専門家の見解・学術記事' },
    C: { label: '証拠レベルC', color: 'bg-yellow-500', desc: 'メディア記事・ブログ' },
    D: { label: '証拠レベルD', color: 'bg-red-500', desc: '個人の意見・未検証' },
  };
  
  const evidenceLevel = evidenceLevelConfig[post.conclusionLevel];
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    toast.success('コメントを追加しました');
    setNewComment('');
  };
  
  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* ヘッダー */}
      <div className="sticky top-[57px] bg-white border-b border-slate-200 px-4 py-3 z-10">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        </Link>
      </div>
      
      {/* 質問とAI回答 */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">{post.aiModel}</Badge>
          <span className="text-xs text-slate-500">{post.submitter}</span>
          <span className="text-xs text-slate-400">
            {new Date(post.createdAt).toLocaleDateString('ja-JP')}
          </span>
        </div>
        
        <h1 className="text-xl font-bold text-slate-900 mb-4">
          {post.question}
        </h1>
        
        <Card className="p-4 mb-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-sm font-medium text-slate-700">AI回答</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {post.aiResponse}
          </p>
        </Card>
        
        {/* 暫定結論 */}
        {post.conclusion && (
          <Card className="p-4 mb-4 border-2 border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-slate-700" />
              <span className="font-bold text-slate-900">暫定結論</span>
              <Badge className={`${evidenceLevel.color} text-white ml-auto`}>
                {evidenceLevel.label}
              </Badge>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              {post.conclusion}
            </p>
            <div className="bg-slate-50 rounded p-2">
              <p className="text-xs text-slate-600">
                {evidenceLevel.desc}
              </p>
            </div>
          </Card>
        )}
        
        <Separator className="my-6" />
        
        {/* コメントセクション */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            コメント ({post.comments.length})
          </h2>
          
          {/* コメント入力 */}
          <Card className="p-4">
            <Textarea
              placeholder="コメントを追加..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <Button
              size="sm"
              onClick={handleSubmitComment}
              className="w-full"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              コメントを投稿
            </Button>
          </Card>
          
          {/* コメント一覧 */}
          {post.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
          
          {post.comments.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">まだコメントがありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-slate-900">{comment.author}</span>
            <span className="text-xs text-slate-500 ml-auto">
              {new Date(comment.createdAt).toLocaleDateString('ja-JP')}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            {comment.content}
          </p>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="text-xs h-7">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {comment.votes}
            </Button>
            <Button size="sm" variant="ghost" className="text-xs h-7">
              <MessageSquare className="w-3 h-3 mr-1" />
              返信
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}