import { useState, FormEvent } from 'react';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/react-app/components/ui/select';
import { Label } from '@/react-app/components/ui/label';
import { Loader2 } from 'lucide-react';

const WILAYAS = [
  'الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'البليدة', 'باتنة', 'سطيف', 'سيدي بلعباس', 'بسكرة', 'تلمسان',
  'أدرار', 'الأغواط', 'أم البواقي', 'بجاية', 'بشار', 'البويرة', 'بومرداس', 'برج بوعريريج',
  'تبسة', 'تيارت', 'تيزي وزو', 'تيبازة', 'تيسمسيلت', 'تندوف', 'تيميمون',
  'الجلفة', 'جانت', 'جيجل', 'خنشلة', 'سعيدة', 'سكيكدة', 'سوق أهراس',
  'الشلف', 'الطارف', 'عين الدفلى', 'عين تموشنت', 'عين صالح', 'عين قزام',
  'غرداية', 'غليزان', 'قالمة', 'مستغانم', 'المسيلة', 'معسكر', 'ميلة', 'المدية', 'المغير', 'المنيعة',
  'النعامة', 'الوادي', 'ورقلة', 'إليزي', 'أولاد جلال', 'البيض', 'بني عباس', 'برج باجي مختار',
  'تمنراست', 'تقرت'
];

// نصيحة: استبدل هذه الروابط بروابط صورك بعد رفعها على موقع مثل PostImages
const PRODUCT_IMAGE = "https://i.postimg.cc/mD8z7B3y/Screenshot-20260214-031821-Gallery.jpg"; 

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `🌸 طلب جديد من Atlasio 🌸\n👤 الاسم: ${fullName}\n📍 الولاية: ${wilaya}\n📞 الهاتف: ${phone}\n💰 السعر: 2400 دج (شامل التوصيل)`;

    try {
      await fetch(`https://api.telegram.org/bot8028024261:AAGqUaxed7tsD7PoMb1gQ9QPeVp6tGC8JlQ/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '-1003776870179',
          text: message,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      alert('حدث خطأ في الإرسال، يرجى المحاولة لاحقاً');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-100 p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            حوّل شرفتك إلى حديقة ملونة خلال أسابيع! 🌸
          </h1>

          {/* إصلاح الصورة المكسورة */}
          <div className="mb-6">
            <img 
              src={PRODUCT_IMAGE}
              alt="باك الربيع الملكي"
              className="rounded-2xl w-full h-auto shadow-md"
            />
          </div>

          {submitted ? (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">تم استلام طلبك!</h2>
              <p className="text-gray-600 mb-6">سنتصل بك قريباً لتأكيد العنوان</p>
              <Button onClick={() => setSubmitted(false)} className="w-full bg-pink-500 hover:bg-pink-600">طلب جديد</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="block mb-2 text-gray-700">الاسم الكامل</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="أدخل اسمك الكامل" className="rounded-xl h-12" />
              </div>

              <div>
                <Label className="block mb-2 text-gray-700">الولاية</Label>
                <Select value={wilaya} onValueChange={setWilaya} required>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="اختر ولايتك" />
                  </SelectTrigger>
                  <SelectContent>
                    {WILAYAS.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block mb-2 text-gray-700">رقم الهاتف</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="05/06/07XXXXXXXX" className="rounded-xl h-12" />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-center">
                <p className="font-bold text-gray-800">سعر الباك: 1900 دج + توصيل 500 دج</p>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-2xl shadow-lg">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'اطلب باكك الآن'}
              </Button>
              <p className="text-center text-xs text-gray-500">الدفع عند الاستلام. بذور أصلية مضمونة.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
