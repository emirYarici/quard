import {
  Atom,
  Book,
  Brain,
  Code2,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  LucideIcon,
  Music,
  PenLine,
  Sigma,
} from 'lucide-react-native';
import {COLORS} from './colors';
import {Subject, SubSubject} from '../types/question.types';

export const subjects: Subject[] = [
  {label: 'matematik', id: 0, value: 'mathematics'},
  {label: 'biyoloji', id: 1, value: 'biology'},
  {label: 'kimya', id: 2, value: 'chemistry'},
  {label: 'felsefe', id: 3, value: 'philosophy'},
  {label: 'fizik', id: 4, value: 'physics'},
  {label: 'geometri', id: 5, value: 'geometry'},
  {label: 'türkçe', id: 6, value: 'turkish'},
  {label: 'tarih', id: 7, value: 'history'},
  {label: 'coğrafya', id: 8, value: 'geography'},
  {label: 'din kültürü', id: 9, value: 'religiousculture'},
];

export const subSubjects: SubSubject[] = [
  {label: 'Sözcükte Anlam', subjectId: 6, id: 0, examId: 0},
  {label: 'Söz Yorumu', subjectId: 6, id: 1, examId: 0},
  {label: 'Deyim ve Atasözü', subjectId: 6, id: 2, examId: 0},
  {label: 'Cümlede Anlam', subjectId: 6, id: 3, examId: 0},
  {label: 'Paragraf', subjectId: 6, id: 4, examId: 0},
  {
    label: 'Paragrafta Anlatım Teknikleri',
    subjectId: 6,
    id: 5,
    examId: 0,
  },
  {
    label: 'Paragrafta Düşünceyi Geliştirme Yolları',
    subjectId: 6,
    id: 6,
    examId: 0,
  },
  {label: 'Paragrafta Yapı', subjectId: 6, id: 7, examId: 0},
  {
    label: 'Paragrafta Konu-Ana Düşünce',
    subjectId: 6,
    id: 8,
    examId: 0,
  },
  {
    label: 'Paragrafta Yardımcı Düşünce',
    subjectId: 6,
    id: 9,
    examId: 0,
  },
  {label: 'Ses Bilgisi', subjectId: 6, id: 10, examId: 0},
  {label: 'Yazım Kuralları', subjectId: 6, id: 11, examId: 0},
  {label: 'Noktalama İşaretleri', subjectId: 6, id: 12, examId: 0},
  {label: 'Sözcükte Yapı/Ekler', subjectId: 6, id: 13, examId: 0},
  {label: 'Sözcük Türleri', subjectId: 6, id: 14, examId: 0},
  {label: 'İsimler', subjectId: 6, id: 15, examId: 0},
  {label: 'Zamirler', subjectId: 6, id: 16, examId: 0},
  {label: 'Sıfatlar', subjectId: 6, id: 17, examId: 0},
  {label: 'Zarflar', subjectId: 6, id: 18, examId: 0},
  {label: 'Edat – Bağlaç – Ünlem', subjectId: 6, id: 19, examId: 0},
  {label: 'Fiiller', subjectId: 6, id: 20, examId: 0},
  {
    label: 'Fiilde Anlam (Kip-Kişi-Yapı)',
    subjectId: 6,
    id: 21,
    examId: 0,
  },
  {label: 'Ek Fiil', subjectId: 6, id: 22, examId: 0},
  {label: 'Fiilimsi', subjectId: 6, id: 23, examId: 0},
  {label: 'Fiilde Çatı', subjectId: 6, id: 24, examId: 0},
  {label: 'Sözcük Grupları', subjectId: 6, id: 25, examId: 0},
  {label: 'Cümlenin Ögeleri', subjectId: 6, id: 26, examId: 0},
  {label: 'Cümle Türleri', subjectId: 6, id: 27, examId: 0},
  {label: 'Anlatım Bozukluğu', subjectId: 6, id: 28, examId: 0},

  {label: 'Temel Kavramlar', subjectId: 0, id: 29, examId: 0},
  {label: 'Sayı Basamakları', subjectId: 0, id: 30, examId: 0},
  {label: 'Bölme ve Bölünebilme', subjectId: 0, id: 31, examId: 0},
  {label: 'EBOB – EKOK', subjectId: 0, id: 32, examId: 0},
  {label: 'Rasyonel Sayılar', subjectId: 0, id: 33, examId: 0},
  {label: 'Basit Eşitsizlikler', subjectId: 0, id: 34, examId: 0},
  {label: 'Mutlak Değer', subjectId: 0, id: 35, examId: 0},
  {label: 'Üslü Sayılar', subjectId: 0, id: 36, examId: 0},
  {label: 'Köklü Sayılar', subjectId: 0, id: 37, examId: 0},
  {label: 'Çarpanlara Ayırma', subjectId: 0, id: 38, examId: 0},
  {label: 'Oran Orantı', subjectId: 0, id: 39, examId: 0},
  {label: 'Denklem Çözme', subjectId: 0, id: 40, examId: 0},
  {label: 'Problemler', subjectId: 0, id: 41, examId: 0},
  {
    label: 'Kümeler – Kartezyen Çarpım',
    subjectId: 0,
    id: 42,
    examId: 0,
  },
  {label: 'Mantık', subjectId: 0, id: 43, examId: 0},
  {label: 'Fonskiyonlar', subjectId: 0, id: 44, examId: 0},
  {label: 'Polinomlar', subjectId: 0, id: 45, examId: 0},
  {
    label: '2.Dereceden Denklemler',
    subjectId: 0,
    id: 46,
    examId: 0,
  },
  {
    label: 'Permütasyon ve Kombinasyon',
    subjectId: 0,
    id: 47,
    examId: 0,
  },
  {label: 'Olasılık', subjectId: 0, id: 48, examId: 0},
  {label: 'Veri – İstatistik', subjectId: 0, id: 49, examId: 0},

  {label: 'Temel Kavramlar', subjectId: 5, id: 50, examId: 0},
  {label: 'Doğruda Açılar', subjectId: 5, id: 51, examId: 0},
  {label: 'Üçgende Açılar', subjectId: 5, id: 52, examId: 0},
  {label: 'Özel Üçgenler', subjectId: 5, id: 53, examId: 0},
  {label: 'Açıortay', subjectId: 5, id: 54, examId: 0},
  {label: 'Kenarortay', subjectId: 5, id: 55, examId: 0},
  {label: 'Eşlik ve Benzerlik', subjectId: 5, id: 56, examId: 0},
  {label: 'Üçgende Alan', subjectId: 5, id: 57, examId: 0},
  {label: 'Üçgende Benzerlik', subjectId: 5, id: 58, examId: 0},
  {label: 'Açı Kenar Bağıntıları', subjectId: 5, id: 59, examId: 0},
  {label: 'Çokgenler', subjectId: 5, id: 60, examId: 0},
  {label: 'Özel Dörtgenler', subjectId: 5, id: 61, examId: 0},
  {label: 'Çember ve Daire', subjectId: 5, id: 62, examId: 0},
  {label: 'Analitik Geometri', subjectId: 5, id: 63, examId: 0},
  {label: 'Katı Cisimler', subjectId: 5, id: 64, examId: 0},
  {label: 'Çemberin Analitiği', subjectId: 5, id: 65, examId: 0},

  {
    label: 'Fizik Bilimine Giriş',
    subjectId: 4,
    id: 66,
    examId: 0,
  },
  {
    label: 'Madde ve Özellikleri',
    subjectId: 4,
    id: 67,
    examId: 0,
  },
  {
    label: 'Sıvıların Kaldırma Kuvveti',
    subjectId: 4,
    id: 68,
    examId: 0,
  },
  {label: 'Basınç', subjectId: 4, id: 69, examId: 0},
  {
    label: 'Isı, Sıcaklık ve Genleşme',
    subjectId: 4,
    id: 70,
    examId: 0,
  },
  {label: 'Hareket ve Kuvvet', subjectId: 4, id: 71, examId: 0},
  {label: 'Dinamik', subjectId: 4, id: 72, examId: 0},
  {label: 'İş, Güç ve Enerji', subjectId: 4, id: 73, examId: 0},
  {label: 'Elektrik', subjectId: 4, id: 74, examId: 0},
  {label: 'Manyetizma', subjectId: 4, id: 75, examId: 0},
  {label: 'Dalgalar', subjectId: 4, id: 76, examId: 0},
  {label: 'Optik', subjectId: 4, id: 77, examId: 0},

  {
    label: 'Canlıların Ortak Özellikleri',
    subjectId: 1,
    id: 78,
    examId: 0,
  },
  {
    label: 'Canlıların Temel Bileşenleri',
    subjectId: 1,
    id: 79,
    examId: 0,
  },
  {
    label: 'Hücre ve Organeller – Madde Geçişleri',
    subjectId: 1,
    id: 80,
    examId: 0,
  },
  {
    label: 'Canlıların Sınıflandırılması',
    subjectId: 1,
    id: 81,
    examId: 0,
  },
  {
    label: 'Hücrede Bölünme – Üreme',
    subjectId: 1,
    id: 82,
    examId: 0,
  },
  {label: 'Kalıtım', subjectId: 1, id: 83, examId: 0},
  {label: 'Bitki Biyolojisi', subjectId: 1, id: 84, examId: 0},
  {label: 'Ekosistem', subjectId: 1, id: 85, examId: 0},
  {label: 'Tarih ve Zaman', subjectId: 7, id: 86, examId: 0},
  {
    label: 'İnsanlığın İlk Dönemleri',
    subjectId: 7,
    id: 87,
    examId: 0,
  },
  {label: 'Ortaçağ’da Dünya', subjectId: 7, id: 88, examId: 0},
  {
    label: 'İlk ve Orta Çağlarda Türk Dünyası',
    subjectId: 7,
    id: 89,
    examId: 0,
  },
  {
    label: 'İslam Medeniyetinin Doğuşu',
    subjectId: 7,
    id: 90,
    examId: 0,
  },
  {
    label: 'İlk Türk İslam Devletleri',
    subjectId: 7,
    id: 91,
    examId: 0,
  },
  {
    label: 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi',
    subjectId: 7,
    id: 92,
    examId: 0,
  },
  {
    label: 'Beylikten Devlete Osmanlı Siyaseti(1300-1453)',
    subjectId: 7,
    id: 93,
    examId: 0,
  },
  {
    label: 'Dünya Gücü Osmanlı Devleti (1453-1600)',
    subjectId: 7,
    id: 94,
    examId: 0,
  },
  {
    label: 'Yeni Çağ Avrupa Tarihi',
    subjectId: 7,
    id: 95,
    examId: 0,
  },
  {
    label: 'Yakın Çağ Avrupa Tarihi',
    subjectId: 7,
    id: 96,
    examId: 0,
  },
  {
    label: 'Osmanlı Devletinde Arayış Yılları',
    subjectId: 7,
    id: 97,
    examId: 0,
  },
  {
    label: '18. Yüzyılda Değişim ve Diplomasi',
    subjectId: 7,
    id: 98,
    examId: 0,
  },
  {label: 'En Uzun Yüzyıl', subjectId: 7, id: 99, examId: 0},
  {
    label: 'Osmanlı Kültür ve Medeniyeti',
    subjectId: 7,
    id: 100,
    examId: 0,
  },
  {
    label: '20. Yüzyılda Osmanlı Devleti',
    subjectId: 7,
    id: 101,
    examId: 0,
  },
  {label: 'I. Dünya Savaşı', subjectId: 7, id: 102, examId: 0},
  {
    label: 'Mondros Ateşkesi, İşgaller ve Cemiyetler',
    subjectId: 7,
    id: 103,
    examId: 0,
  },
  {
    label: 'Kurtuluş Savaşına Hazırlık Dönemi',
    subjectId: 7,
    id: 104,
    examId: 0,
  },
  {label: 'I. TBMM Dönemi', subjectId: 7, id: 105, examId: 0},
  {
    label: 'Kurtuluş Savaşı ve Antlaşmalar',
    subjectId: 7,
    id: 106,
    examId: 0,
  },
  {
    label: 'II. TBMM Dönemi ve Çok Partili Hayata Geçiş',
    subjectId: 7,
    id: 107,
    examId: 0,
  },
  {label: 'Türk İnkılabı', subjectId: 7, id: 108, examId: 0},
  {label: 'Atatürk İlkeleri', subjectId: 7, id: 109, examId: 0},
  {
    label: 'Atatürk Dönemi Türk Dış Politikası',
    subjectId: 7,
    id: 110,
    examId: 0,
  },
  {id: 111, label: 'Doğa ve İnsan', subjectId: 8, examId: 0},
  {
    id: 112,
    label: 'Dünya’nın Şekli ve Hareketleri',
    subjectId: 8,
    examId: 0,
  },
  {id: 113, label: 'Coğrafi Konum', subjectId: 8, examId: 0},
  {id: 114, label: 'Harita Bilgisi', subjectId: 8, examId: 0},
  {id: 115, label: 'Atmosfer ve Sıcaklık', subjectId: 8, examId: 0},
  {id: 116, label: 'İklimler', subjectId: 8, examId: 0},
  {id: 117, label: 'Basınç ve Rüzgarlar', subjectId: 8, examId: 0},
  {id: 118, label: 'Nem, Yağış ve Buharlaşma', subjectId: 8, examId: 0},
  {
    id: 119,
    label: 'İç Kuvvetler / Dış Kuvvetler',
    subjectId: 8,
    examId: 0,
  },
  {id: 120, label: 'Su – Toprak ve Bitkiler', subjectId: 8, examId: 0},
  {id: 121, label: 'Nüfus', subjectId: 8, examId: 0},
  {id: 122, label: 'Göç', subjectId: 8, examId: 0},
  {id: 123, label: 'Yerleşme', subjectId: 8, examId: 0},
  {id: 124, label: 'Türkiye’nin Yer Şekilleri', subjectId: 8, examId: 0},
  {id: 125, label: 'Ekonomik Faaliyetler', subjectId: 8, examId: 0},
  {id: 126, label: 'Bölgeler', subjectId: 8, examId: 0},
  {
    id: 127,
    label: 'Uluslararası Ulaşım Hatları',
    subjectId: 8,
    examId: 0,
  },
  {id: 128, label: 'Çevre ve Toplum', subjectId: 8, examId: 0},
  {id: 129, label: 'Doğal Afetler', subjectId: 8, examId: 0},

  {id: 130, label: 'Felsefenin Konusu', subjectId: 3, examId: 0},
  {id: 131, label: 'Bilgi Felsefesi', subjectId: 3, examId: 0},
  {id: 132, label: 'Varlık Felsefesi', subjectId: 3, examId: 0},
  {id: 133, label: 'Din, Kültür ve Medniyet', subjectId: 3, examId: 0},
  {id: 134, label: 'Ahlak Felsefesi', subjectId: 3, examId: 0},
  {id: 135, label: 'Sanat Felsefesi', subjectId: 3, examId: 0},
  {id: 136, label: 'Din Felsefesi', subjectId: 3, examId: 0},
  {id: 137, label: 'Siyaset Felsefesi', subjectId: 3, examId: 0},
  {id: 138, label: 'Bilim Felsefesi', subjectId: 3, examId: 0},

  {id: 138, label: 'İnanç', subjectId: 9, examId: 0},
  {id: 139, label: 'İbadet', subjectId: 9, examId: 0},
  {id: 140, label: 'Ahlak ve Değerler', subjectId: 9, examId: 0},
  {id: 141, label: 'Din, Kültür ve Medniyet', subjectId: 9, examId: 0},
  {id: 142, label: 'Hz. Mhammed (S.A.V.)', subjectId: 9, examId: 0},
  {id: 143, label: 'Vahiy ve Akıl', subjectId: 9, examId: 0},
  {id: 144, label: 'Dünya ve Ahiret', subjectId: 9, examId: 0},
  {
    id: 145,
    label: "Kur’an'a göre Hz. Muhammed (S.A.V.)",
    subjectId: 9,
    examId: 0,
  },
  {id: 146, label: 'İnançla İlgili Meseleler', subjectId: 9, examId: 0},
  {id: 147, label: 'Yahudilik ve Hristiyanlık', subjectId: 9, examId: 0},
  {id: 148, label: 'İslam ve Bilim', subjectId: 9, examId: 0},
  {id: 149, label: 'Anadolu da İslam', subjectId: 9, examId: 0},
  {
    id: 150,
    label: 'İslam Düşüncesinde Tasavvufi Yorumlar',
    subjectId: 9,
    examId: 0,
  },
  {id: 151, label: 'Güncel Dini Meseler', subjectId: 9, examId: 0},
  {id: 152, label: 'Hint ve Çin Dinleri', subjectId: 9, examId: 0},
];

export const EXAM_TYPES = {
  TYT: {id: 0, value: 'tyt', label: 'TYT'},
  YDT: {id: 1, value: 'ydt', label: 'YDT'},
  AYT: {id: 2, value: 'ayt', label: 'AYT'},
};

export function getSubjectVisuals(subject: string): {
  Icon: LucideIcon;
  bgColor: string;
  iconColor: string;
} {
  const lower = subject?.toLowerCase();

  let icon = undefined;
  if (lower?.includes('mathematics')) {
    icon = Sigma;
  } else if (lower?.includes('physics')) {
    icon = Atom;
  } else if (lower?.includes('chemistry')) {
    icon = FlaskConical;
  } // pastel pink
  else if (lower?.includes('biology')) {
    icon = Brain;
  } else if (lower?.includes('history')) {
    icon = Landmark;
  } // soft amber
  else if (lower?.includes('geography')) {
    icon = Globe;
  } // pastel green
  else if (lower?.includes('english') || lower?.includes('language')) {
    icon = Languages;
  } // lavender
  else if (lower?.includes('literature')) {
    icon = Book;
  } // rose pink
  else if (lower?.includes('music')) {
    icon = Music;
  } // soft purple
  else if (lower?.includes('coding') || lower?.includes('informatics')) {
    icon = Code2;
  } // mint
  else if (lower?.includes('philosophy')) {
    icon = PenLine;
  } // soft magenta
  else if (lower?.includes('turkish')) {
    icon = Book;
  } // soft magenta
  else {
    icon = Book;
  }
  console.log('lower', lower);
  return {
    Icon: icon,
    bgColor: lower ? COLORS[`${lower}Bg`] : COLORS.inputBackground,
    iconColor: lower ? COLORS[`${lower}Icon`] : COLORS.inputBackground,
  }; // default: pastel gray
}
