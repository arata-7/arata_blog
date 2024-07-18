import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'arata-blog', // ここにあなたのサービスドメインを記入
  apiKey: process.env.API_KEY, // 環境変数からAPIキーを取得
});
