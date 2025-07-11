import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 인스턴스 생성
const supabase = createClient(
  process.env.SUPABASE_URL!,             // 환경변수에서 Supabase URL
  process.env.SUPABASE_SERVICE_KEY!      // 서버 전용 키
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않은 메서드입니다.' }) // 405: Method Not Allowed
  }

  const { query } = req.body // body에서 검색어 추출

  // Supabase에 Proxy로 요청
  const { data, error } = await supabase
    .from('your_table')                   // 사용할 테이블명
    .select('*')
    .ilike('your_column', `%${query}%`)   // ilike는 부분검색, 대소문자 구분X

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.status(200).json({ data })
}
