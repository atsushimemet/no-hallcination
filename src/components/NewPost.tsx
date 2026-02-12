import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export function NewPost() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiModel, setAiModel] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !aiResponse.trim() || !aiModel) {
      toast.error('すべての必須項目を入力してください');
      return;
    }
    
    toast.success('AI回答を投稿しました!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* ヘッダー */}
      <div className="sticky top-[57px] bg-white border-b border-slate-200 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              キャンセル
            </Button>
          </Link>
          <h2 className="font-bold text-slate-900">新規投稿</h2>
          <div className="w-20" /> {/* スペーサー */}
        </div>
      </div>
      
      <div className="px-4 pt-6">
        {/* 説明 */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">AI回答を検証しましょう</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                AIから得た回答を投稿してください。コミュニティが根拠を提示し、議論を通じて回答の信頼性を検証します。
              </p>
            </div>
          </div>
        </Card>
        
        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 質問 */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-sm font-medium text-slate-700">
              質問 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="question"
              placeholder="例: 地球温暖化は本当に人為的なものですか?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="text-base"
            />
            <p className="text-xs text-slate-500">
              AIに尋ねた質問を入力してください
            </p>
          </div>
          
          {/* AIモデル */}
          <div className="space-y-2">
            <Label htmlFor="model" className="text-sm font-medium text-slate-700">
              AIモデル <span className="text-red-500">*</span>
            </Label>
            <Select value={aiModel} onValueChange={setAiModel}>
              <SelectTrigger id="model">
                <SelectValue placeholder="使用したAIモデルを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GPT-4">GPT-4</SelectItem>
                <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
                <SelectItem value="Claude 3.5">Claude 3.5 Sonnet</SelectItem>
                <SelectItem value="Claude 3">Claude 3 Opus</SelectItem>
                <SelectItem value="Gemini Pro">Gemini Pro</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* AI回答 */}
          <div className="space-y-2">
            <Label htmlFor="response" className="text-sm font-medium text-slate-700">
              AI回答 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="response"
              placeholder="AIが返答した内容をそのまま貼り付けてください..."
              value={aiResponse}
              onChange={(e) => setAiResponse(e.target.value)}
              className="min-h-[200px] text-base"
            />
            <p className="text-xs text-slate-500">
              できるだけ完全な形で貼り付けてください
            </p>
          </div>
          
          {/* 注意事項 */}
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-orange-900 mb-1">投稿前の確認</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• AI回答は改変せず、そのまま投稿してください</li>
                  <li>• 議論を建設的に保つため、根拠必須のルールを守りましょう</li>
                  <li>• 個人情報や機密情報は含めないでください</li>
                </ul>
              </div>
            </div>
          </Card>
          
          {/* 送信ボタン */}
          <Button type="submit" className="w-full" size="lg">
            <Sparkles className="w-4 h-4 mr-2" />
            投稿して検証を開始
          </Button>
        </form>
        
        {/* ガイドライン */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3">投稿後の流れ</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">コミュニティが論点を提示</h4>
                <p className="text-sm text-slate-600">
                  他のユーザーがAI回答に対する論点を提示します
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">根拠URLが集まる</h4>
                <p className="text-sm text-slate-600">
                  各論点に対して、信頼できる情報源からの根拠が追加されます
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">暫定結論が形成される</h4>
                <p className="text-sm text-slate-600">
                  議論と根拠をもとに、証拠レベル付きの暫定結論が導かれます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
