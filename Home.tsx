import { useState, FormEvent } from 'react';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/react-app/components/ui/select';
import { Label } from '@/react-app/components/ui/label';
import { Loader2 } from 'lucide-react';

const WILAYAS = [
  // الولايات الكبرى أولاً
  'الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'البليدة', 'باتنة', 'سطيف', 'سيدي بلعباس', 'بسكرة', 'تلمسان',
  // باقي الولايات
  'أدرار', 'الأغواط', 'أم البواقي', 'بجاية', 'بشار', 'البويرة', 'بومرداس', 'برج بوعريريج',
  'تبسة', 'تيارت', 'تيزي وزو', 'تيبازة', 'تيسمسيلت', 'تندوف', 'تيميمون',
  'الجلفة', 'جانت', 'جيجل',
  'خنشلة',
  'سعيدة', 'سكيكدة', 'سوق أهراس',
  'الشلف',
  'الطارف',
  'عين الدفلى', 'عين تموشنت', 'عين صالح', 'عين قزام',
  'غرداية', 'غليزان',
  'قالمة',
  'مستغانم', 'المسيلة', 'معسكر', 'ميلة', 'المدية', 'المغير', 'المنيعة',
  'النعامة',
  'الوادي', 'ورقلة',
  'إليزي', 'أولاد جلال',
  'البيض', 'بني عباس', 'برج باجي مختار',
  'تمنراست', 'تقرت'
];

const TELEGRAM_BOT_TOKEN = '8028024261:AAGqUaxed7tsD7PoMb1gQ9QPeVp6tGC8JlQ';
const TELEGRAM_CHAT_ID = '-1003776870179';

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `طلب جديد 🌸
الاسم: ${fullName}
الولاية: ${wilaya}
رقم الهاتف: ${phone}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFullName('');
        setWilaya('');
        setPhone('');
      } else {
        alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://019c59e5-a441-7ab2-aa7d-eeda79331ce2.mochausercontent.com/flower-background.png)',
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-pink-100">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800" dir="rtl">
              حوّل شرفتك إلى حديقة ملونة خلال أسابيع! 🌸
            </h1>

            {/* Product Image - Mobile */}
            <div className="md:hidden mb-6 w-full">
              <img 
                src="https://019c59e5-a441-7ab2-aa7d-eeda79331ce2.mochausercontent.com/Screenshot_20260214-031821_Gallery.jpg"
                alt="باك الربيع الملكي"
                className="rounded-xl shadow-lg w-full h-auto object-contain"
                style={{ maxHeight: '400px' }}
              />
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-semibold text-green-600 mb-2" dir="rtl">تم استلام طلبك!</h2>
                <p className="text-gray-600" dir="rtl">سنتصل بك قريباً</p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-pink-500 hover:bg-pink-600"
                >
                  طلب جديد
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="أدخل اسمك الكامل"
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wilaya">الولاية</Label>
                  <Select value={wilaya} onValueChange={setWilaya} required>
                    <SelectTrigger id="wilaya" className="text-right" dir="rtl">
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                    <SelectContent>
                      {WILAYAS.map((w) => (
                        <SelectItem key={w} value={w} className="text-right">
                          {w}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="0555 12 34 56"
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="text-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-base font-semibold text-gray-800" dir="rtl">
                    سعر الباك: 1900 دج + توصيل 500 دج
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    'اطلب باكك الآن'
                  )}
                </Button>

                <p className="text-center text-sm text-gray-600 mt-4" dir="rtl">
                  الدفع عند الاستلام. البذور أصلية وسريعة النمو.
                </p>
              </form>
            )}
          </div>

          {/* Image Section - Desktop */}
          <div className="hidden md:flex justify-center items-start sticky top-8">
            <img 
              src="https://019c59e5-a441-7ab2-aa7d-eeda79331ce2.mochausercontent.com/Screenshot_20260214-031821_Gallery.jpg"
              alt="باك الربيع الملكي"
              className="rounded-2xl shadow-2xl max-w-lg w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
