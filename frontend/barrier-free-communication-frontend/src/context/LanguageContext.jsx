import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Create the context
const LanguageContext = createContext();

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          app_title: 'Barrier Free Communication',
          dashboard: 'Dashboard',
          ui_customization: 'UI Customization',
          voice_command: 'Voice Command Activation',
          help: 'Help',
          faqs: 'FAQs',
          audio_to_asl: 'Audio to ASL',
          asl_to_text: 'ASL to Text',
          captioning: 'Captioning',
          audio_asl_desc: 'Provide audio input to view the ASL animation and to transcribe the audio into multiple languages.',
          asl_text_desc: 'Provide American Sign Language video to view the text output and transcription to other languages.',
          captioning_desc: 'Provide social media URL(Youtube) to view the suitable caption.',
          transcription: 'Transcription:',
          translate_to: 'Which Language to Transcribe into:',
          select_one: 'Select One',
          view_asl: 'View ASL',
          view_translation: 'View Translation',
          save_asl: 'Save ASL',
          save_translation: 'Save Translation',
          uploading: 'Uploading...',
          downloading: 'Downloading...',
          feedback: 'Want to Provide feedback?',
          click_here: 'Click Here',
          allow_record: 'Allow the app to record audio?',
          selected_option: 'Selected Option:',
          // YouTube page translations
          social_media_captioning: 'SOCIAL MEDIA CAPTIONING',
          youtube_label: 'Provide the youtube url link here for which you need the caption',
          enter_youtube_url: 'Enter YouTube URL',
          generate_caption: 'Generate Caption',
          generating: 'Generating...',
          generated_captions: 'Generated Captions:',
          file_type: 'File Type',
          save_captions: 'Save Captions',
          barrier_free_youtube: 'Barrier Free Communication - YouTube Captions',
          video_url: 'Video URL:',
          generated_on: 'Generated on:',
          // UI Customization page translations
          general_ui_customization: 'General UI Customization',
          font_style: 'Font Style',
          select_font_style: 'Select Font Style',
          font_size: 'Font Size',
          select_font_size: 'Select Font Size',
          button_icon_size: 'Button & Icon Size',
          select_button_size: 'Select Button Size',
          dark_light_mode: 'Dark/Light Mode',
          mode_switch_info: 'Switch to enable dark/light mode is placed on the top right corner',
          small: 'Small',
          medium: 'Medium',
          large: 'Large'
        }
      },
      ar: {
        translation: {
          app_title: 'تواصل بدون حواجز',
          dashboard: 'لوحة التحكم',
          ui_customization: 'تخصيص واجهة المستخدم',
          voice_command: 'تفعيل الأوامر الصوتية',
          help: 'المساعدة',
          faqs: 'الأسئلة الشائعة',
          audio_to_asl: 'الصوت إلى لغة الإشارة الأمريكية',
          asl_to_text: 'لغة الإشارة الأمريكية إلى نص',
          captioning: 'التسميات التوضيحية',
          audio_asl_desc: 'قدم مدخلات صوتية لمشاهدة رسوم لغة الإشارة الأمريكية المتحركة ولترجمة الصوت إلى لغات متعددة.',
          asl_text_desc: 'قدم فيديو بلغة الإشارة الأمريكية لعرض نص الإخراج والترجمة إلى لغات أخرى.',
          captioning_desc: 'قدم عنوان URL لوسائل التواصل الاجتماعي (يوتيوب) لعرض التسمية التوضيحية المناسبة.',
          transcription: 'النسخة:',
          translate_to: 'إلى أي لغة تريد النسخ:',
          select_one: 'اختر واحدة',
          view_asl: 'عرض لغة الإشارة الأمريكية',
          view_translation: 'عرض الترجمة',
          save_asl: 'حفظ لغة الإشارة الأمريكية',
          save_translation: 'حفظ الترجمة',
          uploading: 'جاري الرفع...',
          downloading: 'جاري التحميل...',
          feedback: 'هل تريد تقديم ملاحظات؟',
          click_here: 'اضغط هنا',
          allow_record: 'السماح للتطبيق بتسجيل الصوت؟',
          selected_option: 'الخيار المحدد:',
          // YouTube page translations
          social_media_captioning: 'تسميات وسائل التواصل الاجتماعي',
          youtube_label: 'قدم رابط يوتيوب هنا للحصول على التسميات التوضيحية',
          enter_youtube_url: 'أدخل رابط يوتيوب',
          generate_caption: 'إنشاء التسمية التوضيحية',
          generating: 'جارٍ الإنشاء...',
          generated_captions: 'التسميات التوضيحية المُنشأة:',
          file_type: 'نوع الملف',
          save_captions: 'حفظ التسميات التوضيحية',
          barrier_free_youtube: 'تواصل بدون حواجز - تسميات يوتيوب',
          video_url: 'رابط الفيديو:',
          generated_on: 'تم الإنشاء في:',
          // UI Customization page translations
          general_ui_customization: 'التخصيص العام لواجهة المستخدم',
          font_style: 'نمط الخط',
          select_font_style: 'اختر نمط الخط',
          font_size: 'حجم الخط',
          select_font_size: 'اختر حجم الخط',
          button_icon_size: 'حجم الأزرار والأيقونات',
          select_button_size: 'اختر حجم الزر',
          dark_light_mode: 'الوضع الداكن/الفاتح',
          mode_switch_info: 'مفتاح تمكين الوضع الداكن/الفاتح موجود في الزاوية العلوية اليمنى',
          small: 'صغير',
          medium: 'متوسط',
          large: 'كبير'
        }
      },
      hi: {
        translation: {
          app_title: 'बाधा मुक्त संचार',
          dashboard: 'डैशबोर्ड',
          ui_customization: 'यूआई अनुकूलन',
          voice_command: 'वॉइस कमांड सक्रियण',
          help: 'सहायता',
          faqs: 'अक्सर पूछे जाने वाले प्रश्न',
          audio_to_asl: 'ऑडियो से एएसएल',
          asl_to_text: 'एएसएल से टेक्स्ट',
          captioning: 'कैप्शनिंग',
          audio_asl_desc: 'एएसएल एनिमेशन देखने और ऑडियो को कई भाषाओं में ट्रांसक्राइब करने के लिए ऑडियो इनपुट प्रदान करें।',
          asl_text_desc: 'टेक्स्ट आउटपुट और अन्य भाषाओं में अनुवाद देखने के लिए अमेरिकन साइन लैंग्वेज वीडियो प्रदान करें।',
          captioning_desc: 'उपयुक्त कैप्शन देखने के लिए सोशल मीडिया URL (यूट्यूब) प्रदान करें।',
          transcription: 'ट्रांसक्रिप्शन:',
          translate_to: 'किस भाषा में अनुवाद करना है:',
          select_one: 'एक चुनें',
          view_asl: 'एएसएल देखें',
          view_translation: 'अनुवाद देखें',
          save_asl: 'एएसएल सहेजें',
          save_translation: 'अनुवाद सहेजें',
          uploading: 'अपलोड हो रहा है...',
          downloading: 'डाउनलोड हो रहा है...',
          feedback: 'प्रतिक्रिया देना चाहते हैं?',
          click_here: 'यहां क्लिक करें',
          allow_record: 'ऐप को ऑडियो रिकॉर्ड करने की अनुमति दें?',
          selected_option: 'चयनित विकल्प:',
          // YouTube page translations
          social_media_captioning: 'सोशल मीडिया कैप्शनिंग',
          youtube_label: 'जिस यूट्यूब वीडियो के लिए आपको कैप्शन चाहिए उसका URL यहां दें',
          enter_youtube_url: 'यूट्यूब URL दर्ज करें',
          generate_caption: 'कैप्शन बनाएं',
          generating: 'बना रहा है...',
          generated_captions: 'उत्पन्न कैप्शन:',
          file_type: 'फ़ाइल प्रकार',
          save_captions: 'कैप्शन सहेजें',
          barrier_free_youtube: 'बाधा मुक्त संचार - यूट्यूब कैप्शन',
          video_url: 'वीडियो URL:',
          generated_on: 'इस तारीख को बनाया गया:',
          // UI Customization page translations
          general_ui_customization: 'सामान्य यूआई अनुकूलन',
          font_style: 'फ़ॉन्ट शैली',
          select_font_style: 'फ़ॉन्ट शैली चुनें',
          font_size: 'फ़ॉन्ट आकार',
          select_font_size: 'फ़ॉन्ट आकार चुनें',
          button_icon_size: 'बटन और आइकन आकार',
          select_button_size: 'बटन आकार चुनें',
          dark_light_mode: 'डार्क/लाइट मोड',
          mode_switch_info: 'डार्क/लाइट मोड को सक्षम करने के लिए स्विच ऊपरी दाईं कोने पर है',
          small: 'छोटा',
          medium: 'मध्यम',
          large: 'बड़ा'
        }
      }
    }
  });

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'en');
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    
    // Set the document direction based on language
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.style.direction = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
      document.body.style.direction = 'ltr';
    }
  };

  useEffect(() => {
    i18n.on('languageChanged', (lng) => setLanguage(lng));
    
    // Set initial direction
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.style.direction = 'rtl';
    }
    
    return () => {
      i18n.off('languageChanged');
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 