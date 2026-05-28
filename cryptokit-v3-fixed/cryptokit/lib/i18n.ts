// lib/i18n.ts
// All UI strings. Add new languages by adding a key to TRANSLATIONS.
// Components call t('key') — never hardcode UI strings.

export type Lang = 'en' | 'vi' | 'id' | 'th' | 'pt' | 'es' | 'tr'

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English',    flag: '🌐' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', label: 'Indonesia',  flag: '🇮🇩' },
  { code: 'th', label: 'ภาษาไทย',   flag: '🇹🇭' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
]

// Map browser language codes to our supported langs
export const BROWSER_LANG_MAP: Record<string, Lang> = {
  vi: 'vi', id: 'id', th: 'th', pt: 'pt', es: 'es', tr: 'tr',
}

type Translations = Record<string, string>

const en: Translations = {
  // Nav
  nav_tools: 'Tools',
  nav_usecases: 'Use Cases',
  nav_exchanges: 'Exchanges',
  nav_blog: 'Blog',

  // Tools
  tool_liquidation: 'Liquidation',
  tool_profit: 'Profit / PnL',
  tool_dca: 'DCA',
  tool_risk: 'Risk Sizing',
  tool_funding: 'Funding Rate',
  tool_compound: 'Compounding',

  // Calculator labels
  capital: 'Capital (USDT)',
  leverage: 'Leverage',
  entry_price: 'Entry Price ($)',
  direction: 'Direction',
  long: 'Long',
  short: 'Short',
  target_price: 'Target Price ($)',
  stoploss: 'Stop-loss ($)',
  risk_pct: 'Risk per trade (%)',
  total_capital: 'Total Capital (USDT)',
  add_buy: '+ Add buy',
  annual_rate: 'Annual Rate (%)',
  periods: 'Periods (months)',
  initial: 'Initial Amount (USDT)',

  // Results
  liq_price: 'Liquidation Price',
  drop_needed: 'Drop needed',
  position_size: 'Position Size',
  pnl: 'PnL (USDT)',
  roe: 'ROE %',
  price_change: 'Price change',
  avg_cost: 'Avg Cost',
  total_invested: 'Total Invested',
  total_coins: 'Total Coins',
  max_loss: 'Max Loss',
  rec_position: 'Rec. Position',
  sl_distance: 'SL Distance',
  final_amount: 'Final Amount',
  total_profit: 'Total Profit',
  growth: 'Growth',

  // CTAs
  open: 'Open',
  open_account: 'Open account',
  read_review: 'Read review',
  see_overview: 'See overview →',

  // Contextual CTA headers
  cta_liq_high: 'Exchanges with better risk management tools for high leverage:',
  cta_liq_mid: 'Watch your liquidation price closely. Recommended exchanges:',
  cta_liq_low: 'Low leverage — these exchanges have competitive fees:',
  cta_profit: 'Trade this setup on a low-fee exchange:',
  cta_dca: 'Exchanges with DCA / recurring buy features:',
  cta_risk: 'Exchanges with advanced risk controls:',
  cta_funding: 'Check live rates and trade on:',
  cta_compound: 'Start compounding on a reliable exchange:',

  // Warnings
  warn_high_lev: 'Warning: x{lev} leverage has very high liquidation risk.',
  warn_mid_lev: 'Note: x{lev} leverage is moderate — watch your liquidation price.',

  // Use cases
  uc_intro: 'Find the right exchange for your trading style — not just the biggest name.',
  uc_small_title: 'Best for $100 accounts',
  uc_small_sub: 'Low min deposit · low fees',
  uc_scalp_title: 'Best for scalping',
  uc_scalp_sub: 'Ultra-low maker fees · fast execution',
  uc_copy_title: 'Best copy trading',
  uc_copy_sub: 'Follow pro traders automatically',
  uc_mobile_title: 'Best mobile app',
  uc_mobile_sub: 'Trade on the go, smooth UI',
  uc_liq_title: 'Lowest liquidation risk',
  uc_liq_sub: 'Better risk controls, partial TP/SL',
  uc_alt_title: 'Best for altcoins',
  uc_alt_sub: 'Widest token selection',

  // Exchanges page
  tier1_note: 'Binance is also a reliable option for long-term spot holdings.',
  tier2_label: 'Tier 2 — Growth exchanges (better affiliate terms)',
  comm_label: 'Commission',
  maker_label: 'Maker fee',

  // Binance note
  bnb_note: 'Largest exchange by volume with strong security record. Recommended as a primary account for spot holdings — not the focus of this site, but worth mentioning.',
  bnb_link: 'Read our overview →',

  // Footer
  footer_disclaimer: 'This site contains affiliate links. We may earn a commission when you sign up through our links, at no extra cost to you.',
  footer_not_financial: 'Not financial advice. Crypto trading involves significant risk.',
}

const vi: Translations = {
  nav_tools: 'Công cụ',
  nav_usecases: 'Trường hợp',
  nav_exchanges: 'Sàn giao dịch',
  nav_blog: 'Blog',
  tool_liquidation: 'Giá cháy',
  tool_profit: 'Lãi / Lỗ',
  tool_dca: 'DCA',
  tool_risk: 'Quản lý rủi ro',
  tool_funding: 'Funding Rate',
  tool_compound: 'Lãi kép',
  capital: 'Vốn (USDT)',
  leverage: 'Đòn bẩy',
  entry_price: 'Giá vào lệnh ($)',
  direction: 'Hướng',
  long: 'Long (mua)',
  short: 'Short (bán)',
  target_price: 'Giá mục tiêu ($)',
  stoploss: 'Giá stoploss ($)',
  risk_pct: 'Rủi ro mỗi lệnh (%)',
  total_capital: 'Tổng vốn (USDT)',
  add_buy: '+ Thêm lệnh',
  annual_rate: 'Lãi suất hàng năm (%)',
  periods: 'Số tháng',
  initial: 'Số tiền ban đầu (USDT)',
  liq_price: 'Giá cháy tài khoản',
  drop_needed: 'Giảm cần thiết',
  position_size: 'Khối lượng lệnh',
  pnl: 'Lãi/lỗ (USDT)',
  roe: 'ROE %',
  price_change: 'Biến động giá',
  avg_cost: 'Giá vốn trung bình',
  total_invested: 'Tổng vốn đã dùng',
  total_coins: 'Tổng số coin',
  max_loss: 'Lỗ tối đa',
  rec_position: 'Size lệnh đề xuất',
  sl_distance: 'Khoảng cách SL',
  final_amount: 'Số tiền cuối',
  total_profit: 'Tổng lợi nhuận',
  growth: 'Tăng trưởng',
  open: 'Mở',
  open_account: 'Mở tài khoản',
  read_review: 'Xem đánh giá',
  see_overview: 'Xem tổng quan →',
  cta_liq_high: 'Sàn có công cụ quản lý rủi ro tốt cho đòn bẩy cao:',
  cta_liq_mid: 'Theo dõi giá cháy sát sao. Các sàn được khuyên dùng:',
  cta_liq_low: 'Đòn bẩy thấp — các sàn có phí cạnh tranh:',
  cta_profit: 'Trade theo chiến lược này trên sàn phí thấp:',
  cta_dca: 'Sàn có tính năng DCA / mua định kỳ:',
  cta_risk: 'Sàn có công cụ kiểm soát rủi ro nâng cao:',
  cta_funding: 'Xem lãi suất trực tiếp và giao dịch trên:',
  cta_compound: 'Bắt đầu lãi kép trên sàn đáng tin cậy:',
  warn_high_lev: 'Cảnh báo: đòn bẩy x{lev} có nguy cơ cháy tài khoản rất cao.',
  warn_mid_lev: 'Lưu ý: đòn bẩy x{lev} ở mức vừa — theo dõi giá cháy sát sao.',
  uc_intro: 'Chọn sàn phù hợp với chiến lược của bạn — không chỉ là sàn lớn nhất.',
  uc_small_title: 'Tốt nhất cho tài khoản $100',
  uc_small_sub: 'Nạp tối thiểu thấp · phí rẻ',
  uc_scalp_title: 'Tốt nhất cho scalping',
  uc_scalp_sub: 'Phí maker cực thấp · khớp lệnh nhanh',
  uc_copy_title: 'Copy trade tốt nhất',
  uc_copy_sub: 'Tự động theo trader chuyên nghiệp',
  uc_mobile_title: 'App mobile tốt nhất',
  uc_mobile_sub: 'Giao dịch mọi lúc, UI mượt',
  uc_liq_title: 'Rủi ro cháy tài khoản thấp nhất',
  uc_liq_sub: 'Kiểm soát rủi ro tốt hơn, TP/SL từng phần',
  uc_alt_title: 'Tốt nhất cho altcoin',
  uc_alt_sub: 'Danh sách token rộng nhất',
  tier1_note: 'Binance cũng là lựa chọn đáng tin để giữ spot dài hạn.',
  tier2_label: 'Tier 2 — Sàn đang tăng trưởng (hoa hồng affiliate tốt hơn)',
  comm_label: 'Hoa hồng',
  maker_label: 'Phí maker',
  bnb_note: 'Sàn lớn nhất theo khối lượng giao dịch, bảo mật tốt. Phù hợp để giữ spot lâu dài — không phải trọng tâm của site này nhưng đáng nhắc tới.',
  bnb_link: 'Xem bài giới thiệu →',
  footer_disclaimer: 'Website này chứa affiliate link. Chúng tôi có thể nhận hoa hồng khi bạn đăng ký qua link, không mất thêm phí từ phía bạn.',
  footer_not_financial: 'Không phải lời khuyên tài chính. Giao dịch crypto có rủi ro cao.',
}

const id: Translations = {
  nav_tools: 'Alat', nav_usecases: 'Kasus', nav_exchanges: 'Bursa', nav_blog: 'Blog',
  tool_liquidation: 'Likuidasi', tool_profit: 'Profit', tool_dca: 'DCA',
  tool_risk: 'Manajemen Risiko', tool_funding: 'Funding Rate', tool_compound: 'Bunga Majemuk',
  capital: 'Modal (USDT)', leverage: 'Leverage', entry_price: 'Harga Masuk ($)',
  direction: 'Arah', long: 'Long (beli)', short: 'Short (jual)',
  liq_price: 'Harga Likuidasi', drop_needed: 'Penurunan diperlukan',
  position_size: 'Ukuran Posisi', pnl: 'PnL (USDT)', open: 'Buka',
  open_account: 'Buka akun', read_review: 'Baca ulasan',
  warn_high_lev: 'Peringatan: leverage x{lev} memiliki risiko likuidasi sangat tinggi.',
  cta_liq_high: 'Bursa dengan alat manajemen risiko lebih baik:',
  tier2_label: 'Tier 2 — Bursa Berkembang',
  footer_disclaimer: 'Situs ini berisi tautan afiliasi.',
  footer_not_financial: 'Bukan saran keuangan. Trading crypto berisiko tinggi.',
  add_buy: '+ Tambah beli', annual_rate: 'Tingkat Tahunan (%)', periods: 'Periode (bulan)',
  initial: 'Jumlah Awal (USDT)', final_amount: 'Jumlah Akhir', total_profit: 'Total Profit', growth: 'Pertumbuhan',
}

export const TRANSLATIONS: Record<Lang, Translations> = { en, vi, id, th: {}, pt: {}, es: {}, tr: {} }

// Fill missing keys with English fallback
for (const lang of Object.keys(TRANSLATIONS) as Lang[]) {
  if (lang === 'en') continue
  for (const key of Object.keys(en)) {
    if (!TRANSLATIONS[lang][key]) {
      TRANSLATIONS[lang][key] = en[key]
    }
  }
}
