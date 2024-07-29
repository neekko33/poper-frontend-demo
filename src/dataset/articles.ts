import articles from './articles.json'

export interface Article {
  id: string,
  title: string,
  description: string,
  detail: string,
  img_url: string,
  img_url_small: string,
  video_url?: string,
  updated_at: string,
  alt: string
}


export default articles as Article[]