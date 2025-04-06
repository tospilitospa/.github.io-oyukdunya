// bolumler_meta.js
const bolumlerMeta = [
  {
    id: 0, // Dizi indeksi ile eşleşmesi için 0'dan başlatmak mantıklı
    baslik: "Yolculuk",
    dosyaAdi: "bolum1.txt" // 1. Bölümün metnini içeren dosya
  },
  {
    id: 1,
    baslik: "Karşılaşma",
    dosyaAdi: "bolum2.txt"
  },
  {
    id: 2,
    baslik: "Kehanet",
    dosyaAdi: "bolum3.txt" // Örneğin, 3. bölüm için
  }
  // ... diğer tüm bölümleri buraya ekle
];

// Toplam bölüm sayısını kolayca almak için (isteğe bağlı)
const toplamBolumSayisi = bolumlerMeta.length;