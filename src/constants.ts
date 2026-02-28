import { Sparkles, Star, Moon, Sun, Compass, Hexagon, BookOpen, LayoutTemplate, Diamond } from 'lucide-react';

export type FieldType = 'text' | 'date' | 'time' | 'select' | 'textarea';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
  fields: FormField[];
  promptContext: string;
}

const commonFields = {
  fullName: { id: 'fullName', label: 'Họ và tên', type: 'text' as FieldType, placeholder: 'Nhập họ và tên của bạn', required: true },
  dob: { id: 'dob', label: 'Ngày tháng năm sinh (Dương lịch)', type: 'date' as FieldType, required: true },
  tob: { id: 'tob', label: 'Giờ sinh', type: 'time' as FieldType, required: true },
  pob: { id: 'pob', label: 'Nơi sinh (Tỉnh/Thành phố)', type: 'text' as FieldType, placeholder: 'VD: Hà Nội', required: true },
  gender: { 
    id: 'gender', 
    label: 'Giới tính', 
    type: 'select' as FieldType, 
    options: [{ value: 'male', label: 'Nam' }, { value: 'female', label: 'Nữ' }],
    required: true 
  },
  question: { id: 'question', label: 'Câu hỏi hoặc vấn đề bạn đang quan tâm', type: 'textarea' as FieldType, placeholder: 'Nhập câu hỏi của bạn...', required: true },
};

export const CATEGORIES: Category[] = [
  { 
    id: 'numerology', 
    name: 'Thần Số Học', 
    icon: Hexagon, 
    description: 'Khám phá ý nghĩa các con số trong cuộc đời bạn.',
    fields: [commonFields.fullName, commonFields.dob],
    promptContext: 'chuyên gia hàng đầu về Thần Số Học (Numerology) theo trường phái Pythagoras'
  },
  { 
    id: 'tuvi', 
    name: 'Tử Vi', 
    icon: Moon, 
    description: 'Luận giải lá số tử vi phương Đông.',
    fields: [commonFields.fullName, commonFields.dob, commonFields.tob, commonFields.gender],
    promptContext: 'bậc thầy về Tử Vi Đẩu Số phương Đông'
  },
  { 
    id: 'astrology', 
    name: 'Bản Đồ Sao', 
    icon: Star, 
    description: 'Giải mã bản đồ sao chiêm tinh học phương Tây.',
    fields: [commonFields.fullName, commonFields.dob, commonFields.tob, commonFields.pob],
    promptContext: 'chuyên gia Chiêm tinh học phương Tây (Western Astrology), chuyên đọc Bản Đồ Sao (Natal Chart)'
  },
  { 
    id: 'tarot', 
    name: 'Tarot', 
    icon: LayoutTemplate, 
    description: 'Lắng nghe thông điệp từ những lá bài Tarot.',
    fields: [commonFields.question],
    promptContext: 'Reader Tarot chuyên nghiệp, sử dụng bộ bài Rider-Waite-Smith'
  },
  { 
    id: 'playingcards', 
    name: 'Bói Bài Tây', 
    icon: Diamond, 
    description: 'Dự đoán tương lai qua bộ bài tây 52 lá.',
    fields: [commonFields.question, commonFields.fullName, commonFields.dob],
    promptContext: 'chuyên gia bói bài Tây (Cartomancy) 52 lá'
  },
  { 
    id: 'bazi', 
    name: 'Bát Tự', 
    icon: Sun, 
    description: 'Phân tích vận mệnh qua Tứ Trụ (Bát Tự).',
    fields: [commonFields.fullName, commonFields.dob, commonFields.tob, commonFields.gender],
    promptContext: 'đại sư phong thủy và Bát Tự (Tứ Trụ - Bazi)'
  },
  { 
    id: 'oracle', 
    name: 'Oracle', 
    icon: BookOpen, 
    description: 'Nhận thông điệp chữa lành từ bài Oracle.',
    fields: [commonFields.question],
    promptContext: 'người chữa lành và Reader bài Oracle'
  },
  { 
    id: 'humandesign', 
    name: 'Human Design', 
    icon: Compass, 
    description: 'Khám phá thiết kế con người và chiến lược sống của bạn.',
    fields: [commonFields.fullName, commonFields.dob, commonFields.tob, commonFields.pob],
    promptContext: 'chuyên gia phân tích Human Design (Thiết kế con người)'
  },
  { 
    id: 'runes', 
    name: 'Cổ Ngữ Runes', 
    icon: Sparkles, 
    description: 'Gieo quẻ và giải mã thông điệp từ cổ ngữ Bắc Âu.',
    fields: [commonFields.question],
    promptContext: 'pháp sư Bắc Âu chuyên gieo quẻ và giải mã Cổ ngữ Runes (Elder Futhark)'
  },
];
