import { GoogleGenAI } from "@google/genai";
import { Category } from "../constants";

// Initialize the Gemini API client
// The API key is injected by the AI Studio environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateReading(category: Category, formData: Record<string, string>): Promise<string> {
  const currentYear = 2026;
  
  let userInfo = "";
  for (const [key, value] of Object.entries(formData)) {
    const field = category.fields.find(f => f.id === key);
    if (field) {
      userInfo += `- **${field.label}**: ${value}\n`;
    }
  }

  const prompt = `Bạn là một ${category.promptContext}. 
Người dùng đang yêu cầu một phiên đọc/luận giải về "${category.name}".

Dưới đây là thông tin của người dùng:
${userInfo}

Yêu cầu:
1. Dựa trên thông tin được cung cấp, hãy thực hiện luận giải chi tiết, chính xác, khách quan và mang tính định hướng sâu sắc.
2. Nếu là các môn cần tính toán (Thần số học, Tử vi, Bản đồ sao, Bát tự, Human Design), hãy đóng vai trò là hệ thống tính toán siêu việt, tự động lập lá số/biểu đồ dựa trên dữ liệu (không cần vẽ hình ảnh, chỉ cần mô tả các chỉ số/vị trí quan trọng bằng văn bản) và luận giải chúng.
3. Nếu là các môn gieo quẻ (Tarot, Oracle, Bài Tây, Runes), hãy tự động "rút bài/gieo quẻ" ngẫu nhiên một cách tâm linh nhất cho người dùng dựa trên câu hỏi của họ, liệt kê các lá bài/rune đã rút được và giải nghĩa chi tiết.
4. **ĐẶC BIỆT QUAN TRỌNG**: Hãy dành một phần riêng biệt để đưa ra dự đoán, lời khuyên và xu hướng cho năm hiện tại là năm **${currentYear}** dựa trên bộ môn này.
5. Trình bày bằng định dạng Markdown, sử dụng các tiêu đề (H2, H3), in đậm, danh sách để bài đọc rõ ràng, dễ nhìn, mang tính thẩm mỹ cao.
6. Giọng văn: Thấu cảm, thông thái, dịu dàng và mang tính chữa lành.

Hãy bắt đầu bài luận giải của bạn ngay bây giờ.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Xin lỗi, không thể tạo bài đọc lúc này. Vui lòng thử lại sau.";
  } catch (error) {
    console.error("Error generating reading:", error);
    throw new Error("Đã xảy ra lỗi khi kết nối với vũ trụ. Vui lòng thử lại sau.");
  }
}
