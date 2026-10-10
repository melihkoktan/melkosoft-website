'use strict';
// This website does not transmit logs or call an AI service.
// The diagnostic playground is an honest, deterministic, client-side prototype.
const sampleLogs = {
  lora: `[10:42:08] RAK3172 UART READY
[10:42:09] AT+JOIN=1:0:10:8
[10:42:11] +EVT:JOIN FAILED
[10:42:12] AT_BUSY_ERROR
[10:42:13] Retrying join in 5000ms`,
  wifi: `[14:07:21] ESP32 WiFi.begin(...)
[14:07:24] WIFI_DISCONNECTED
[14:07:27] WiFi connection timeout
[14:07:30] Reconnect attempt #4`,
  sensor: `[08:16:01] DHT11 read started
[08:16:03] DHT checksum error
[08:16:05] Sensor read failed
[08:16:06] Invalid humidity: NaN`,
  brownout: `[11:02:44] ESP32 boot
[11:02:45] Brownout detector was triggered
[11:02:46] rst:0xc (SW_CPU_RESET)
[11:02:47] Rebooting...`
};
const copy = {
  en: {
    navProduct:'Product',navDemo:'Live demo',navRoadmap:'Roadmap',navAbout:'About',navContact:"Let's talk ↗",
    heroEyebrow:'INDEPENDENT STARTUP · BUILDING IN PUBLIC',heroHeading:'Make the<br/>connected world<br/><em>make sense.</em>',heroDescription:"We're building smarter tools for the engineers behind connected devices. Less guesswork, clearer answers, better systems.",heroCta:'Explore the prototype',heroCta2:'Our vision',heroNote:'Early-stage venture · DevicePilot in development',stripLead:'BUILT FOR THE HARDWARE-SOFTWARE EDGE',
    productTop:'OUR FIRST PRODUCT CONCEPT',productHeading:'Complex devices.<br/><span>Clearer answers.</span>',productCopy:"Firmware failures shouldn't require hours of scrolling through serial logs. DevicePilot is being designed as a focused diagnostics workspace for small embedded and IoT teams.",feature1Title:'Bring the logs',feature1Copy:'Start with serial output and connectivity errors, without complex hardware setup.',feature2Title:'Find the signal',feature2Copy:'Recognize known error patterns and identify sensible next debugging steps.',feature3Title:'Build the intelligence',feature3Copy:'Our roadmap includes Claude-powered, context-aware explanations and actionable reports.',
    demoTop:'TRY A WORKING MINI PROTOTYPE',demoEyebrow:'INTERACTIVE EXPERIMENT',demoHeading:'See the signal<br/><em>in the noise.</em>',demoCopy:'Paste a device log or load a sample. This early, in-browser rule-based prototype recognizes a few common problems and suggests possible checks.',logInput:'DEVICE LOG INPUT',localOnly:'Runs locally. No data is sent to a server.',analyzeButton:'Analyze log',analysisLabel:'DIAGNOSTIC OUTPUT',placeholderTitle:'Waiting for a log',placeholderCopy:'Choose a sample and select “Analyze log” to see the prototype in action.',nextChecks:'SUGGESTED NEXT CHECKS',copyResult:'Copy diagnosis',prototypeDisclaimer:'Illustrative, rule-based prototype — NOT connected to Claude API yet.',prototypeDisclaimer2:'Not a substitute for engineering verification.',
    visionHeading:'Great engineering starts with <em>understanding.</em>',visionCopy:'The future of connected products should be easier to debug, maintain and trust. We want to give independent developers and smaller hardware teams the kind of insight that used to demand an entire infrastructure team.',visionLink:'Talk to us about early access',
    roadmapTop:'A REALISTIC PATH FROM IDEA TO PRODUCT',roadmapHeading:'Small steps.<br/><span>Real progress.</span>',roadmapCopy:"We're an early-stage initiative. Here's the direction we're working toward, not a list of completed features.",roadmap1State:'CURRENT FOCUS',roadmap1Title:'Explore & validate',roadmap1Copy:'Test common ESP32/LoRaWAN troubleshooting patterns, publish a lightweight proof of concept and talk to developers.',roadmap2State:'PLANNED',roadmap2Title:'Context-aware diagnosis',roadmap2Copy:'Explore integrating Claude API for richer log interpretation, checklists and technical summaries.',roadmap3State:'LONGER-TERM VISION',roadmap3Title:'Connected fleet insights',roadmap3Copy:'Evaluate secure device telemetry, anomaly histories and remote diagnostics for growing IoT teams.',
    aboutEyebrow:'WHO WE ARE',aboutHeading:'Curious builders.<br/><span>Real-world problems.</span>',aboutP1:'MelkoSoft is an independent, early-stage software initiative based in Türkiye, founded around an interest in embedded systems, IoT and practical artificial intelligence.',aboutP2:"Our initial work draws on hands-on experience with ESP32 development, wireless communication and sensor-based projects. We're taking the first steps toward turning that experience into accessible developer tools.",aboutNote:"We're in the exploration and prototyping stage — no claims of a launched commercial product or established customer base.",
    contactHeading:'Building something<br/><em>connected?</em>',contactCopy:"Are you working with embedded devices, wrestling with logs, or interested in the future of DevicePilot? We'd love to hear from you.",contactSmall:'INDEPENDENT THINKING.<br/>CONNECTED POSSIBILITIES.',footerRights:'AN INDEPENDENT EARLY-STAGE INITIATIVE.',footerBuild:'BUILT WITH CURIOSITY, IN TÜRKİYE.',
    found:'PATTERN FOUND',notFound:'NO KNOWN PATTERN',ready:'READY',complete:'COMPLETE',copied:'Copied!',
    loraTitle:'LoRaWAN join / retry issue',loraSummary:'The log contains a join failure and/or busy-state error. These events may be related, but this snippet alone does not establish a single root cause.',loraSteps:['Confirm the device is in LoRaWAN mode and has the correct regional frequency plan.','Check DevEUI, JoinEUI/AppEUI, AppKey and the network-server device configuration.','Wait for the module to finish the previous command before sending another join request.','Check gateway coverage and examine the network-server join events.'],
    wifiTitle:'Wi-Fi connection instability',wifiSummary:'A disconnection or timeout pattern appears in the log. Check radio conditions and configuration before assuming a firmware defect.',wifiSteps:['Verify SSID, credentials and whether a supported 2.4 GHz network is available.','Check power stability, signal strength and antenna placement.','Log Wi-Fi disconnect reason codes and distinguish authentication from connectivity errors.','Test backoff timing to avoid repeated aggressive reconnects.'],
    sensorTitle:'Sensor read / checksum issue',sensorSummary:'The log suggests a failed sensor measurement or an invalid value. Wiring, timing or power may be contributing factors.',sensorSteps:['Verify the sensor pin map, ground and supply voltage.','Check pull-up requirements and the sensor library configuration.','Allow the sensor’s minimum sampling interval before reading again.','Treat NaN values as invalid and confirm with a known-good sensor.'],
    powerTitle:'Possible power / brownout problem',powerSummary:'A brownout or reboot pattern appears. Supply voltage and current delivery are sensible first checks.',powerSteps:['Measure supply voltage during Wi-Fi transmit and device startup.','Review USB cable, regulator output and power-source current capability.','Check connections and any high-current peripheral loads.','Avoid disabling brownout detection merely to conceal unstable power.'],
    genericTitle:'No supported issue identified',genericSummary:'This small demonstration only recognizes a few known patterns. An unmatched log is not evidence that the device is healthy.',genericSteps:['Add a timestamp and a complete error snippet.','Include board model, firmware version and what operation failed.','Reproduce the issue and collect surrounding events for manual review.']
  },
  tr: {
    navProduct:'Ürün',navDemo:'Canlı demo',navRoadmap:'Yol haritası',navAbout:'Hakkımızda',navContact:'İletişim ↗',
    heroEyebrow:'BAĞIMSIZ GİRİŞİM · GELİŞTİRME AŞAMASINDA',heroHeading:'Bağlantılı dünyayı<br/><em>anlaşılır kılıyoruz.</em>',heroDescription:'Bağlantılı cihazlar geliştiren mühendisler için daha akıllı araçlar tasarlıyoruz. Daha az tahmin, daha net cevaplar, daha iyi sistemler.',heroCta:'Prototipi dene',heroCta2:'Vizyonumuz',heroNote:'Erken aşama girişim · DevicePilot geliştiriliyor',stripLead:'DONANIM VE YAZILIMIN KESİŞİMİNDE',
    productTop:'İLK ÜRÜN FİKRİMİZ',productHeading:'Karmaşık cihazlar.<br/><span>Daha net cevaplar.</span>',productCopy:'Firmware hatalarını anlamak saatlerce seri port kaydı okumayı gerektirmemeli. DevicePilot, küçük gömülü sistem ve IoT ekipleri için odaklı bir tanılama çalışma alanı olarak tasarlanıyor.',feature1Title:'Logları getir',feature1Copy:'Karmaşık donanım kurulumu olmadan seri port çıktıları ve bağlantı hatalarıyla başla.',feature2Title:'Sorunu ayıkla',feature2Copy:'Bilinen hata örüntülerini tanı ve mantıklı sonraki test adımlarını belirle.',feature3Title:'Yapay zekâyı ekle',feature3Copy:'Yol haritamızda Claude destekli, bağlama duyarlı açıklamalar ve uygulanabilir raporlar bulunuyor.',
    demoTop:'ÇALIŞAN MİNİ PROTOTİP',demoEyebrow:'ETKİLEŞİMLİ DENEY',demoHeading:'Karmaşanın içindeki<br/><em>sinyali bul.</em>',demoCopy:'Bir cihaz logu yapıştır veya örnek yükle. Tarayıcıda çalışan bu erken aşama kural tabanlı prototip bazı yaygın sorunları tanır ve kontrol adımları önerir.',logInput:'CİHAZ LOGU',localOnly:'Yerel çalışır. Veriler sunucuya gönderilmez.',analyzeButton:'Logu analiz et',analysisLabel:'TANI ÇIKTISI',placeholderTitle:'Log bekleniyor',placeholderCopy:'Bir örnek seç ve prototipi denemek için “Logu analiz et” butonuna bas.',nextChecks:'ÖNERİLEN KONTROLLER',copyResult:'Tanıyı kopyala',prototypeDisclaimer:'Örnek kural tabanlı prototip — henüz Claude API bağlantısı YOK.',prototypeDisclaimer2:'Mühendislik doğrulamasının yerini tutmaz.',
    visionHeading:'İyi mühendislik, <em>anlamakla</em> başlar.',visionCopy:'Bağlantılı cihazların hata ayıklaması, bakımı ve güvenilirliği daha kolay olmalı. Bağımsız geliştiricilerin ve küçük donanım ekiplerinin, büyük altyapı ekipleri olmadan da değerli teknik içgörülere ulaşmasını hedefliyoruz.',visionLink:'Erken erişim için bizimle konuş',
    roadmapTop:'FİKİRDEN ÜRÜNE GERÇEKÇİ YOL',roadmapHeading:'Küçük adımlar.<br/><span>Somut ilerleme.</span>',roadmapCopy:'Erken aşamada bir girişimiz. Bunlar tamamladığımız özellikler değil, üzerinde çalışmayı planladığımız adımlar.',roadmap1State:'MEVCUT ODAK',roadmap1Title:'Keşfet ve doğrula',roadmap1Copy:'Yaygın ESP32/LoRaWAN hata örüntülerini test etmek, basit bir prototip yayımlamak ve geliştiricilerle görüşmek.',roadmap2State:'PLANLANIYOR',roadmap2Title:'Bağlama duyarlı teşhis',roadmap2Copy:'Daha zengin log yorumlama, kontrol listeleri ve teknik özetler için Claude API entegrasyonunu araştırmak.',roadmap3State:'UZUN VADELİ VİZYON',roadmap3Title:'Bağlantılı cihaz içgörüleri',roadmap3Copy:'Güvenli telemetri, hata geçmişi ve büyüyen IoT ekipleri için uzaktan tanılama seçeneklerini değerlendirmek.',
    aboutEyebrow:'BİZ KİMİZ?',aboutHeading:'Meraklı geliştiriciler.<br/><span>Gerçek problemler.</span>',aboutP1:'MelkoSoft, Türkiye merkezli; gömülü sistemler, IoT ve pratik yapay zekâ teknolojilerine duyulan ilgiyle şekillenmiş erken aşama bağımsız bir yazılım girişimidir.',aboutP2:'İlk çalışmalarımız ESP32 geliştirme, kablosuz iletişim ve sensör tabanlı projeler üzerindeki uygulamalı deneyimden besleniyor. Bu deneyimi erişilebilir geliştirici araçlarına dönüştürmek için ilk adımları atıyoruz.',aboutNote:'Keşif ve prototipleme aşamasındayız; ticari olarak piyasaya çıkmış bir ürünümüz veya yerleşik müşteri kitlemiz olduğunu iddia etmiyoruz.',
    contactHeading:'Bağlantılı bir şey mi<br/><em>geliştiriyorsun?</em>',contactCopy:'Gömülü sistemlerle çalışıyorsan, cihaz loglarıyla uğraşıyorsan veya DevicePilot’ın geleceğini merak ediyorsan bizimle iletişime geç.',contactSmall:'BAĞIMSIZ DÜŞÜNCE.<br/>BAĞLANTILI OLASILIKLAR.',footerRights:'ERKEN AŞAMADA BAĞIMSIZ BİR GİRİŞİM.',footerBuild:'TÜRKİYE’DE MERAKLA GELİŞTİRİLİYOR.',
    found:'ÖRÜNTÜ BULUNDU',notFound:'BİLİNEN ÖRÜNTÜ YOK',ready:'HAZIR',complete:'TAMAMLANDI',copied:'Kopyalandı!',
    loraTitle:'LoRaWAN katılım / tekrar deneme sorunu',loraSummary:'Logda ağa katılım hatası ve/veya meşgul durum hatası var. Olaylar ilişkili olabilir; yalnızca bu kayıtla kesin kök neden belirlenemez.',loraSteps:['Cihazın LoRaWAN modunda ve doğru bölgesel frekans planında olduğundan emin ol.','DevEUI, JoinEUI/AppEUI, AppKey ve ağ sunucusundaki cihaz kaydını kontrol et.','Yeni katılım komutu göndermeden önce önceki komutun tamamlanmasını bekle.','Ağ geçidi kapsamasını ve sunucudaki join olaylarını incele.'],
    wifiTitle:'Wi-Fi bağlantı kararsızlığı',wifiSummary:'Logda bağlantı kesilmesi veya zaman aşımı örüntüsü görünüyor. Firmware hatasına karar vermeden önce radyo koşulları ve ayarlar kontrol edilmeli.',wifiSteps:['SSID, parola ve desteklenen 2,4 GHz ağını doğrula.','Besleme kararlılığı, sinyal gücü ve anten konumunu kontrol et.','Bağlantı kopma neden kodlarını kaydet; kimlik doğrulama ve bağlantı sorunlarını ayır.','Çok sık yeniden bağlanmayı önlemek için bekleme sürelerini test et.'],
    sensorTitle:'Sensör okuma / checksum sorunu',sensorSummary:'Kayıt başarısız sensör ölçümü veya geçersiz değer gösteriyor. Bağlantı, zamanlama ya da besleme etkili olabilir.',sensorSteps:['Sensör pinlerini, toprak bağlantısını ve besleme voltajını doğrula.','Pull-up gereksinimlerini ve sensör kütüphanesi ayarlarını kontrol et.','İki okuma arasında sensörün minimum örnekleme süresini bekle.','NaN değerlerini geçersiz say ve sağlam bir sensörle karşılaştır.'],
    powerTitle:'Olası güç / brownout sorunu',powerSummary:'Brownout veya yeniden başlatma örüntüsü var. İlk kontrol noktası besleme voltajı ve akım kapasitesidir.',powerSteps:['Wi-Fi iletimi ve başlangıç sırasında besleme voltajını ölç.','USB kablosunu, regülatör çıkışını ve kaynağın akım kapasitesini kontrol et.','Bağlantıları ve yüksek akım çeken çevre birimlerini incele.','Kararsız güç beslemesini gizlemek için brownout tespitini doğrudan kapatma.'],
    genericTitle:'Desteklenen bir sorun tanınmadı',genericSummary:'Bu küçük demo yalnızca birkaç bilinen örüntüyü tanır. Eşleşme olmaması cihazın sağlıklı olduğunu göstermez.',genericSteps:['Zaman damgası ve eksiksiz bir hata kaydı ekle.','Kart modelini, firmware sürümünü ve başarısız olan işlemi belirt.','Sorunu tekrar üret ve çevresindeki olayları elle incelemek üzere kaydet.']
  }
};
let lang = 'en';
let lastDiagnosis = null;
const logInput = document.getElementById('log-input');
const tabs = [...document.querySelectorAll('.sample-tab')];
function setSample(name) {
  logInput.value = sampleLogs[name] || '';
  tabs.forEach(tab => {const selected = tab.dataset.sample === name;tab.classList.toggle('active',selected);tab.setAttribute('aria-pressed',String(selected));});
  resetResults();
}
function resetResults() {
  document.getElementById('result-placeholder').hidden = false;
  document.getElementById('result-content').hidden = true;
  document.getElementById('result-status').textContent = copy[lang].ready;
  lastDiagnosis = null;
}
function diagnose(log) {
  const low=log.toLowerCase();
  if (/join failed|join_fail|at_busy_error|join denied|join timeout|join unsuccessful|lora join/.test(low)) return 'lora';
  if (/wifi_disconnected|wi-?fi.*(timeout|disconnect)|reconnect attempt|wifi connection failed|reason: ?20[0-9]/.test(low)) return 'wifi';
  if (/checksum error|sensor read failed|dht.*(fail|error)|invalid humidity|nan/.test(low)) return 'sensor';
  if (/brownout|undervoltage|low voltage|voltage drop|power failure|rst:0xc/.test(low)) return 'power';
  return 'generic';
}
function renderDiagnosis() {
  const key = diagnose(logInput.value);
  const t = copy[lang];
  const isFound = key !== 'generic';
  const details = {title:t[key+'Title'],summary:t[key+'Summary'],steps:t[key+'Steps'],key};
  lastDiagnosis = details;
  document.getElementById('result-placeholder').hidden=true;
  document.getElementById('result-content').hidden=false;
  document.getElementById('result-status').textContent=t.complete;
  document.getElementById('result-chip').textContent=isFound?t.found:t.notFound;
  document.getElementById('result-heading').textContent=details.title;
  document.getElementById('result-summary').textContent=details.summary;
  const list=document.getElementById('result-actions');list.replaceChildren();
  details.steps.forEach(step=>{const li=document.createElement('li');li.textContent=step;list.appendChild(li);});
}
function setLanguage(next) {
  lang=next;
  const t=copy[lang];
  document.documentElement.lang=lang;
  document.getElementById('language-toggle').innerHTML=(lang==='en'?'TR':'EN')+' <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t[el.dataset.i18n]||el.textContent;});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{const html=t[el.dataset.i18nHtml];if(html)el.innerHTML=html;});
  document.getElementById('year').textContent=String(new Date().getFullYear());
  document.title=lang==='en'?'MelkoSoft — Build a more connected world':'MelkoSoft — Bağlantılı dünyayı anlaşılır kılıyoruz';
  if(lastDiagnosis)renderDiagnosis();else document.getElementById('result-status').textContent=t.ready;
}
tabs.forEach(tab=>tab.addEventListener('click',()=>setSample(tab.dataset.sample)));
document.getElementById('analyze-button').addEventListener('click',renderDiagnosis);
document.getElementById('language-toggle').addEventListener('click',()=>setLanguage(lang==='en'?'tr':'en'));
document.getElementById('copy-result').addEventListener('click',async()=>{
  if(!lastDiagnosis)return;
  const text=[lastDiagnosis.title,lastDiagnosis.summary,copy[lang].nextChecks,...lastDiagnosis.steps.map((step,i)=>`${i+1}. ${step}`)].join('\n');
  try{await navigator.clipboard.writeText(text);const btn=document.getElementById('copy-result');btn.textContent=copy[lang].copied;setTimeout(()=>{btn.textContent=copy[lang].copyResult+' ↗';},1500);}catch{window.prompt('Copy diagnosis:',text);}
});
const menuButton=document.getElementById('menu-button');
menuButton.addEventListener('click',()=>{const open=document.getElementById('nav-links').classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('#nav-links a').forEach(a=>a.addEventListener('click',()=>{document.getElementById('nav-links').classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
setSample('lora');setLanguage('en');
