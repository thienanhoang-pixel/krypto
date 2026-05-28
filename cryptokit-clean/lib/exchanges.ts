export interface Exchange {
  id: string; logo: string; bg: string; fg: string
  name: string; tag: string; link: string
  badge?: string; badgeVariant?: 'top' | 'best'
}

export const EXCHANGES: Exchange[] = [
  { id:'bybit',  logo:'By',  bg:'#2A3156', fg:'#fff',    name:'Bybit',   tag:'Best for beginners · Copy trading · 0.01% maker',  link:'https://partner.bybit.com/b/43292',         badge:'Top Pick', badgeVariant:'top' },
  { id:'okx',    logo:'OKX', bg:'#1a1a1a', fg:'#00E5FF', name:'OKX',     tag:'50% affiliate comm · DeFi/Web3 · 0.02% maker',      link:'https://okx.com/join/8938421',              badge:'50% comm', badgeVariant:'best' },
  { id:'gate',   logo:'Gt',  bg:'#26A17B', fg:'#fff',    name:'Gate.io', tag:'1400+ altcoins · DCA bots',                          link:'https://www.gate.com/referral/earn-together/invite/BQMXVQpc' },
  { id:'kucoin', logo:'Ku',  bg:'#1BA27A', fg:'#fff',    name:'KuCoin',  tag:'Trading bots built-in · early altcoins',             link:'https://www.kucoin.com/r/af/rPHF9C7' },
  { id:'bingx',  logo:'Bx',  bg:'#006BFF', fg:'#fff',    name:'BingX',   tag:'Copy trading · simple mobile UI',                   link:'https://bingxdao.com/referral-program/XGPUQV?activityId=g_1568148333284118599' },
  { id:'mexc',   logo:'Mx',  bg:'#2C5DE5', fg:'#fff',    name:'MEXC',    tag:'0% maker fee · fast new listings',                  link:'https://promote.mexc.com/r/TafyTnJZKF' },
  { id:'bitget', logo:'Bg',  bg:'#1C6AFF', fg:'#fff',    name:'Bitget',  tag:'Copy trade profit sharing · new user bonus',        link:'https://www.bitget.com/referral/register?clacCode=4MEC6N0D' },
  { id:'exness', logo:'Ex',  bg:'#16A951', fg:'#fff',    name:'Exness',  tag:'Forex + crypto · tight spreads',                    link:'https://one.exness.link/a/c_tqysynx0yo' },
]

export const BINANCE_LINK = 'https://www.binance.com/register?ref=508340856'

export const LIQ_RECS   = { high: ['bybit','okx','bitget'], medium: ['bybit','okx'], low: ['mexc','gate'] }
export const PROFIT_RECS = ['bybit','okx']
export const DCA_RECS    = ['gate','kucoin']
export const RISK_RECS   = ['bybit','bitget']

export const USE_CASES = {
  small:  { title:'Best exchanges for $100 accounts',  ids:['mexc','bingx','bybit'] },
  scalp:  { title:'Best exchanges for scalping',        ids:['mexc','okx','bybit'] },
  copy:   { title:'Best copy trading exchanges',        ids:['bitget','bingx','bybit'] },
  mobile: { title:'Best mobile trading apps',           ids:['bybit','okx','kucoin'] },
} as const
export type UseCaseKey = keyof typeof USE_CASES

export function getExchanges(ids: readonly string[]): Exchange[] {
  return ids.map(id => EXCHANGES.find(e => e.id === id)!).filter(Boolean)
}
