import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { generateReading } from '../services/gemini';
import Markdown from 'react-markdown';

export default function Reading() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === categoryId);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!category) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl mb-4">Không tìm thấy thể loại này.</h2>
        <button onClick={() => navigate('/')} className="text-indigo-400 hover:text-indigo-300">Quay lại trang chủ</button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const readingResult = await generateReading(category, formData);
      setResult(readingResult);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const Icon = category.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Link to="/" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Link>

      <div className="flex items-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mr-6">
          <Icon className="w-8 h-8 text-indigo-300" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-2">{category.name}</h1>
          <p className="text-white/60">{category.description}</p>
        </div>
      </div>

      {!result ? (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.fields.map((field) => (
                <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-white/80 mb-2">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    >
                      <option value="" disabled>Chọn {field.label.toLowerCase()}</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.label} className="bg-gray-900">{opt.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      style={field.type === 'date' || field.type === 'time' ? { colorScheme: 'dark' } : {}}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang kết nối với vũ trụ...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Bắt đầu giải mã
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md"
        >
          <div className="prose prose-invert prose-indigo max-w-none">
            <div className="markdown-body">
              <Markdown>{result}</Markdown>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
            >
              Xem lại / Đặt câu hỏi khác
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
