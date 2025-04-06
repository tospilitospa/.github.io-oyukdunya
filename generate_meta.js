// generate_meta.js

// Gerekli Node.js modüllerini içe aktar
const fs = require('fs'); // Dosya sistemi işlemleri için
const path = require('path'); // Dosya yolları ile çalışmak için

// Klasör ve dosya yollarını tanımla
const bolumlerKlasoru = path.join(__dirname, 'bolumler'); // 'bolumler' klasörünün tam yolu
const metaDosyasiYolu = path.join(__dirname, 'bolumler_meta.js'); // Oluşturulacak meta dosyasının yolu

try {
  // 1. bolumler klasöründeki dosyaları oku
  const dosyalar = fs.readdirSync(bolumlerKlasoru);

  // 2. Sadece .txt dosyalarını filtrele
  const txtDosyalari = dosyalar.filter(dosya => dosya.toLowerCase().endsWith('.txt'));

  // 3. Dosyaları doğal sıralama ile sırala (bolum1, bolum2, bolum10 şeklinde doğru sıralama için)
  txtDosyalari.sort((a, b) => {
    const sayiA = parseInt(a.match(/\d+/)?.[0] || 0); // Dosya adından sayıyı çıkar
    const sayiB = parseInt(b.match(/\d+/)?.[0] || 0); // Dosya adından sayıyı çıkar
    return sayiA - sayiB;
  });

  // 4. Meta verisini oluştur
  const bolumlerMeta = txtDosyalari.map((dosyaAdi, index) => {
    // Basit bir başlık oluştur (örn: "bolum1.txt" -> "Bölüm 1")
    const match = dosyaAdi.match(/(\d+)/);
    const bolumNumarasi = match ? parseInt(match[1]) : index + 1;
    const baslik = `Bölüm ${bolumNumarasi}`; // Başlığı buradan özelleştirebilirsiniz

    return {
      id: index, // Dizi indeksi 0'dan başlar
      baslik: baslik,
      dosyaAdi: dosyaAdi // Sadece dosya adı
    };
  });

  // 5. bolumler_meta.js dosyasının içeriğini string olarak hazırla
  const dosyaIcerigi = `// Bu dosya otomatik olarak generate_meta.js tarafından oluşturulmuştur.
// Manuel olarak düzenlemeyin!

const bolumlerMeta = ${JSON.stringify(bolumlerMeta, null, 2)}; // JSON'u düzgün formatlı string'e çevir

// Toplam bölüm sayısını kolayca almak için (isteğe bağlı)
const toplamBolumSayisi = bolumlerMeta.length;
`;

  // 6. Hazırlanan içeriği bolumler_meta.js dosyasına yaz
  fs.writeFileSync(metaDosyasiYolu, dosyaIcerigi, 'utf8');

  console.log(`Başarılı: ${metaDosyasiYolu} dosyası ${bolumlerMeta.length} bölüm ile güncellendi.`);

} catch (error) {
  console.error('Hata oluştu:', error);
  // Klasör bulunamazsa veya okuma hatası olursa bilgilendir
  if (error.code === 'ENOENT') {
    console.error(`Hata: '${bolumlerKlasoru}' klasörü bulunamadı veya okunamadı.`);
  }
}