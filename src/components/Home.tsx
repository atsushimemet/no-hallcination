import { Link } from 'react-router';
import { AlertCircle, CheckCircle2, MessageSquare, Eye, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { getAllPosts, type Post } from '../lib/mockData';

export function Home() {
  const posts = getAllPosts();
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">AI回答を検証する</h2>
        <p className="text-blue-100 mb-4">
          AIにベースを作ってもらい、みんなでハルシネーションをなくしましょう
        </p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">{posts.length}</div>
            <div className="text-xs text-blue-100">検証中</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">89</div>
            <div className="text-xs text-blue-100">論点</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">234</div>
            <div className="text-xs text-blue-100">根拠URL</div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <Tabs defaultValue="all" className="px-4 pt-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="active">議論中</TabsTrigger>
          <TabsTrigger value="resolved">解決済み</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-3 mt-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-3 mt-4">
          {posts.filter(p => p.status === 'active' || p.status === 'disputed').map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-3 mt-4">
          {posts.filter(p => p.status === 'resolved').map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const statusConfig = {
    active: { icon: MessageSquare, label: '議論中', color: 'bg-blue-100 text-blue-700' },
    disputed: { icon: AlertCircle, label: '論争中', color: 'bg-orange-100 text-orange-700' },
    resolved: { icon: CheckCircle2, label: '解決済み', color: 'bg-green-100 text-green-700' },
  };
  
  const evidenceLevelConfig = {
    A: { label: '証拠A', color: 'bg-green-500' },
    B: { label: '証拠B', color: 'bg-blue-500' },
    C: { label: '証拠C', color: 'bg-yellow-500' },
    D: { label: '証拠D', color: 'bg-red-500' },
  };
  
  const status = statusConfig[post.status];
  const StatusIcon = status.icon;
  const evidenceLevel = evidenceLevelConfig[post.conclusionLevel];
  
  return (
    <Link to={`/post/${post.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-1 h-full ${evidenceLevel.color} rounded-full`} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className={`${status.color} text-xs`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {post.aiModel}
              </Badge>
            </div>
            
            <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
              {post.question}
            </h3>
            
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {post.aiResponse}
            </p>
            
            {post.conclusion && (
              <div className="bg-slate-50 rounded-lg p-2 mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-slate-500" />
                  <span className="text-xs font-medium text-slate-700">暫定結論</span>
                  <Badge className={`${evidenceLevel.color} text-white text-xs ml-auto`}>
                    {evidenceLevel.label}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {post.conclusion}
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.arguments.length + post.comments.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{post.arguments.reduce((sum, arg) => sum + arg.votes, 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <span className="ml-auto">
                {new Date(post.updatedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}