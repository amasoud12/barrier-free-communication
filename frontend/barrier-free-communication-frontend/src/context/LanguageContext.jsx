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
          large: 'Large',
          // Feedback page translations
          have_feedback: 'Have a Feedback?',
          enter_email: 'Enter your email',
          share_feedback: 'Please share your feedback here!',
          sending: 'Sending...',
          submit: 'Submit',
          recent_feedback: 'Recent Feedback',
          anonymous_user: 'Anonymous User',
          help_feature_overview: 'Help & Feature Overview',
          youtube_captioning: 'YouTube Captioning',
          youtube_captioning_desc: 'Generate captions from YouTube videos using the video URL.',
          asl_gesture_input: 'ASL Gesture Input',
          asl_gesture_input_desc: 'Capture sign language input from webcam in real-time.',
          asl_output: 'ASL Output',
          asl_output_desc: 'Convert audio/text into American Sign Language gestures.',
          text_output: 'Text Output',
          text_output_desc: 'Generate readable text from various inputs like audio or sign.',
          live_audio_input: 'Live Audio Input',
          live_audio_input_desc: 'Record live microphone audio for transcription.',
          wav_file_upload: 'WAV File Upload',
          wav_file_upload_desc: 'Upload a WAV file and generate transcript or captions.',
          translate_languages: 'Translate to Other Languages',
          translate_languages_desc: 'Transcribe output and convert it to multiple languages.',
          accessibility_tools: 'Accessibility Tools',
          accessibility_tools_desc: 'Assistive tools for enhanced accessibility across devices.',
          save_transcripts: 'Save Transcripts',
          save_transcripts_desc: 'Export your captions in .txt, .pdf, or other formats.',
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
          large: 'كبير',
          // Feedback page translations
          have_feedback: 'هل لديك ملاحظات؟',
          enter_email: 'أدخل بريدك الإلكتروني',
          share_feedback: 'يرجى مشاركة ملاحظاتك هنا!',
          sending: 'جاري الإرسال...',
          submit: 'إرسال',
          recent_feedback: 'الملاحظات الأخيرة',
          anonymous_user: 'مستخدم مجهول',
          help_feature_overview: 'المساعدة ونظرة عامة على الميزات',
          youtube_captioning: 'ترجمة يوتيوب',
          youtube_captioning_desc: 'إنشاء ترجمات من مقاطع فيديو يوتيوب باستخدام رابط الفيديو.',
          asl_gesture_input: 'إدخال لغة الإشارة الأمريكية',
          asl_gesture_input_desc: 'التقاط إدخال لغة الإشارة من كاميرا الويب في الوقت الفعلي.',
          asl_output: 'مخرجات لغة الإشارة الأمريكية',
          asl_output_desc: 'تحويل الصوت/النص إلى إيماءات لغة الإشارة الأمريكية.',
          text_output: 'مخرجات النص',
          text_output_desc: 'إنشاء نص مقروء من مدخلات متنوعة مثل الصوت أو الإشارة.',
          live_audio_input: 'إدخال الصوت المباشر',
          live_audio_input_desc: 'تسجيل صوت الميكروفون المباشر للنسخ.',
          wav_file_upload: 'تحميل ملف WAV',
          wav_file_upload_desc: 'تحميل ملف WAV وإنشاء النص أو الترجمات.',
          translate_languages: 'الترجمة إلى لغات أخرى',
          translate_languages_desc: 'نسخ المخرجات وتحويلها إلى لغات متعددة.',
          accessibility_tools: 'أدوات إمكانية الوصول',
          accessibility_tools_desc: 'أدوات مساعدة لتحسين إمكانية الوصول عبر الأجهزة.',
          save_transcripts: 'حفظ النصوص',
          save_transcripts_desc: 'تصدير الترجمات بتنسيق .txt أو .pdf أو تنسيقات أخرى.',
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
          large: 'बड़ा',
          // Feedback page translations
          have_feedback: 'प्रतिक्रिया है?',
          enter_email: 'अपना ईमेल दर्ज करें',
          share_feedback: 'कृपया अपनी प्रतिक्रिया यहां साझा करें!',
          sending: 'भेज रहा है...',
          submit: 'जमा करें',
          recent_feedback: 'हाल की प्रतिक्रियाएँ',
          anonymous_user: 'अज्ञात उपयोगकर्ता',
          help_feature_overview: 'सहायता और सुविधा अवलोकन',
          youtube_captioning: 'यूट्यूब कैप्शनिंग',
          youtube_captioning_desc: 'वीडियो URL का उपयोग करके यूट्यूब वीडियो से कैप्शन बनाएं।',
          asl_gesture_input: 'एएसएल जेस्चर इनपुट',
          asl_gesture_input_desc: 'वेबकैम से रीयल-टाइम में साइन लैंग्वेज इनपुट कैप्चर करें।',
          asl_output: 'एएसएल आउटपुट',
          asl_output_desc: 'ऑडियो/टेक्स्ट को अमेरिकन साइन लैंग्वेज जेस्चर में बदलें।',
          text_output: 'टेक्स्ट आउटपुट',
          text_output_desc: 'ऑडियो या साइन जैसे विभिन्न इनपुट से पठनीय टेक्स्ट बनाएं।',
          live_audio_input: 'लाइव ऑडियो इनपुट',
          live_audio_input_desc: 'ट्रांसक्रिप्शन के लिए लाइव माइक्रोफोन ऑडियो रिकॉर्ड करें।',
          wav_file_upload: 'WAV फ़ाइल अपलोड',
          wav_file_upload_desc: 'WAV फ़ाइल अपलोड करें और ट्रांसक्रिप्ट या कैप्शन बनाएं।',
          translate_languages: 'अन्य भाषाओं में अनुवाद',
          translate_languages_desc: 'आउटपुट को ट्रांसक्राइब करें और इसे कई भाषाओं में बदलें।',
          accessibility_tools: 'पहुंच योग्यता टूल्स',
          accessibility_tools_desc: 'डिवाइस पर बढ़ी हुई पहुंच योग्यता के लिए सहायक टूल्स।',
          save_transcripts: 'ट्रांसक्रिप्ट सहेजें',
          save_transcripts_desc: 'अपने कैप्शन को .txt, .pdf, या अन्य प्रारूपों में निर्यात करें।',
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